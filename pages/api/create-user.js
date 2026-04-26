import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

function cleanName(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z]/g, "");
}

function generateEmail(fullName, role) {
  const parts = String(fullName || "").trim().split(/\s+/);

  const firstName = cleanName(parts[0] || "user");
  const surname = cleanName(parts[parts.length - 1] || "pf");
  const surnamePart = surname.slice(0, 2) || "pf";

  if (role === "student") {
    return `${firstName}${surnamePart}@pfa.edu`;
  }

  if (role === "teacher") {
    return `${firstName}${surnamePart}.teacher@pfa.edu`;
  }

  if (role === "accountant") {
    return `${firstName}${surnamePart}.accountant@pfa.edu`;
  }

  return `${firstName}${surnamePart}.staff@pfa.edu`;
}

function generatePassword() {
  const code = Math.floor(1000 + Math.random() * 9000);
  return `PFA${code}`;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const {
      full_name,
      role,
      class_name,
      phone,
      assigned_class,
      staff_role,
    } = req.body;

    if (!full_name || !role) {
      return res.status(400).json({ error: "Full name and role are required." });
    }

    let email = generateEmail(full_name, role);
    const password = generatePassword();

    const { data: createdUser, error: createError } =
      await supabaseAdmin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
      });

    if (createError && createError.message?.toLowerCase().includes("already")) {
      const randomTwo = Math.floor(10 + Math.random() * 90);
      const [namePart, domain] = email.split("@");
      email = `${namePart}${randomTwo}@${domain}`;

      const retry = await supabaseAdmin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
      });

      if (retry.error) {
        return res.status(400).json({ error: retry.error.message });
      }

      createdUser.data = retry.data;
    } else if (createError) {
      return res.status(400).json({ error: createError.message });
    }

    const userId = createdUser?.user?.id || createdUser?.data?.user?.id;

    if (!userId) {
      return res.status(400).json({ error: "Could not create user account." });
    }

    const { error: profileError } = await supabaseAdmin.from("profiles").insert([
      {
        id: userId,
        full_name,
        role,
        phone: phone || null,
      },
    ]);

    if (profileError) {
      return res.status(400).json({ error: profileError.message });
    }

    if (role === "student") {
      const { data: studentData, error: studentError } = await supabaseAdmin
        .from("students")
        .insert([
          {
            full_name,
            class: class_name,
            login_email: email,
            temp_password: password,
          },
        ])
        .select()
        .single();

      if (studentError) {
        return res.status(400).json({ error: studentError.message });
      }

      return res.status(200).json({
        success: true,
        role,
        email,
        password,
        record: studentData,
      });
    }

    const { data: staffData, error: staffError } = await supabaseAdmin
      .from("staff")
      .insert([
        {
          full_name,
          role: staff_role || role,
          assigned_class: assigned_class || null,
          phone: phone || null,
          login_email: email,
          temp_password: password,
        },
      ])
      .select()
      .single();

    if (staffError) {
      return res.status(400).json({ error: staffError.message });
    }

    return res.status(200).json({
      success: true,
      role,
      email,
      password,
      record: staffData,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
