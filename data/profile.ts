/* =====================================================================
   ЭНД ӨӨРИЙН МЭДЭЭЛЛЭЭ ОРУУЛНА.
   Хоёр хэлтэй: content.mn — монголоор, content.en — англиар.
   Хоёуланг нь бөглөнө. Өөр файл хөндөх шаардлагагүй.
   Профайл зургаа public/profile.jpg гэж хийнэ.
   ===================================================================== */

export type Lang = "mn" | "en";

export type Project = {
  title: string;
  description: string;
  meta: string;
  year: string;
  link?: string; // хоосон бол дарахад хаашаа ч очихгүй
};

export type Experience = {
  period: string;
  role: string;
  company: string;
  description: string;
};

export type Social = { label: string; url?: string };

export type Content = {
  name: string;
  roles: string[];
  location: string;
  status: string;
  intro: string;
  about: string;
  skills: string[];
  projects: Project[];
  experience: Experience[];
  contactLead: string;
};

export const profile = {
  defaultLang: "mn" as Lang, // Сайт анх нээгдэхэд ямар хэлээр харагдах: "mn" эсвэл "en"
  timezone: "", // Жишээ: "Asia/Ulaanbaatar". Хоосон бол үзэгчийн цаг харагдана
  photo: "/profile.webp", // public/ доторх зураг. Зам нь "/" -ээр эхэлнэ, "public" гэж бичихгүй
  email: "battulgabatgerel92@gmail.com",
  socials: [
    { label: "GitHub", url: "https://github.com/Tdlgx" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/battulga-batgerel-6a0396320/" },
    { label: "Instagram", url: "https://www.instagram.com/tulgaa4.0/" },
  ] satisfies Social[],

  content: {
    /* ---------------- МОНГОЛ ---------------- */
    mn: {
      name: "Баттулга Батгэрэл", // 2 үг бол 2 мөрөнд гарна
      roles: ["Программист", "Хөгжүүлэгч", "Систем дизайнер"], // ээлжлэн солигдоно
      location: "Улаанбаатар, Монгол",
      status: "Шинэ төсөлд нээлттэй",
      intro:
        "Программ хангамжийг системийн бүтцээс нь эхлээд хэрэглэгчийн харах интерфейс хүртэл нь төлөвлөж, бүтээдэг.",
      about:
        "Би ажлын бүх шатанд оролцох дуртай: систем хэрхэн уялдахыг төлөвлөх, кодоо бичих, эцсийн бүтээгдэхүүнийг ойлгомжтой, хурдан ажилладаг болгох. Ихэнхдээ веб дээр бүтээдэг. Цэгцтэй бүтэц, энгийн дизайн, хүмүүсийн бодитоор ашигладаг зүйл хийхийг чухалчилдаг. Код бичээгүй үедээ ихэвчлэн заалд байдаг.",
      skills: ["Flutter", "Dart", "C# / .NET", "Микросервис", "Docker", "Next.js", "React", "TypeScript", "Систем дизайн", "AI интеграц"],
      projects: [
        {
          title: "Цагтаа",
          description:
            "Үсчин, гоо сайхны салон, барбершоп зэрэг жижиг бизнесүүдэд зориулсан онлайн цаг захиалгын вэб апп. Үйлчлүүлэгч үйлчилгээ, ажилтан, цагаа сонгоод утас + OTP-ээр захиална. Next.js, TypeScript, PostgreSQL дээр хийж буй дипломын ажил.",
          meta: "Вэб апп",
          year: "2026",
          link: "https://github.com/Tdlgx/Tsagtaa",
        },
        {
          title: "Хуулийн AI Зөвлөх",
          description:
            "Хуулийн асуултад монгол хэлээр хариулдаг AI чат бүхий Flutter апп. Түгээмэл асуултууд, харанхуй горим, өөрөө хийсэн анимэйшнтэй. Android, iOS, веб дээр ажиллана.",
          meta: "Мобайл апп, AI",
          year: "2026",
          link: "https://github.com/Tdlgx/legal-ai-consultant-flutter",
        },
        {
          title: "Микросервис архитектур",
          description:
            ".NET 8 дээрх хэрэглэгч, барааны хоёр сервис, Ocelot API gateway, PostgreSQL. Бүгд Docker Compose-оор асч, GitHub Actions CI дээр автоматаар build, тест хийгдэнэ.",
          meta: "Backend",
          year: "2026",
          link: "https://github.com/Tdlgx/MicroServices-test",
        },
        {
          title: "Энэ портфолио сайт",
          description:
            "Next.js, React, TypeScript дээр хийсэн. Canvas дээр зурсан одтой тэнгэр, тойрог замтай профайл зураг, монгол/англи хэл солих боломжтой.",
          meta: "Вэб сайт",
          year: "2026",
          link: "https://github.com/Tdlgx/portfolio",
        },
      ],
      experience: [
        {
          period: "2026, 1 жил",
          role: "Программ хангамжийн дадлагажигч",
          company: "Smart Software, Монгол",
          description: "Мэргэжлийн чиглэлээрээ нэг жилийн дадлага хийсэн.",
        },
      ],
      contactLead: "Төсөл бодож байна уу, эсвэл зүгээр мэндлэх үү? Надад бичээрэй.",
    },

    /* ---------------- ENGLISH ---------------- */
    en: {
      name: "Battulga Batgerel",
      roles: ["Programmer", "Developer", "System Designer"],
      location: "Ulaanbaatar, Mongolia",
      status: "Open to new projects",
      intro:
        "I design and build software end to end, from the system architecture down to the interface people actually use.",
      about:
        "I like owning the whole picture: planning how a system fits together, writing the code, and making the finished product clear and fast to use. Most of what I build lives on the web. I care about clean structure, honest design, and shipping things people really use. When I'm not coding, I'm usually at the gym.",
      skills: ["Flutter", "Dart", "C# / .NET", "Microservices", "Docker", "Next.js", "React", "TypeScript", "System design", "AI integration"],
      projects: [
        {
          title: "Tsagtaa",
          description:
            "An online booking web app for small businesses like barbers, beauty salons and nail studios. Customers pick a service, a staff member and a time, then confirm with their phone and an OTP. My graduation thesis, built with Next.js, TypeScript and PostgreSQL.",
          meta: "Web app",
          year: "2026",
          link: "https://github.com/Tdlgx/Tsagtaa",
        },
        {
          title: "Legal AI Consultant",
          description:
            "A Flutter app with an AI chat that answers legal questions in Mongolian. Includes common questions, dark mode and custom animations. Runs on Android, iOS and the web.",
          meta: "Mobile app, AI",
          year: "2026",
          link: "https://github.com/Tdlgx/legal-ai-consultant-flutter",
        },
        {
          title: "Microservices architecture",
          description:
            "User and product services on .NET 8 behind an Ocelot API gateway, backed by PostgreSQL. Everything starts with Docker Compose, and GitHub Actions CI builds and tests every push.",
          meta: "Backend",
          year: "2026",
          link: "https://github.com/Tdlgx/MicroServices-test",
        },
        {
          title: "This portfolio",
          description:
            "Built with Next.js, React and TypeScript. A starfield drawn on canvas, a profile photo with its own orbit, and a Mongolian/English switch.",
          meta: "Website",
          year: "2026",
          link: "https://github.com/Tdlgx/portfolio",
        },
      ],
      experience: [
        {
          period: "2026, 1 year",
          role: "Software Engineering Intern",
          company: "Smart Software, Mongolia",
          description: "A one-year internship in my field of study.",
        },
      ],
      contactLead: "Have a project in mind, or just want to say hello? Write to me.",
    },
  } satisfies Record<Lang, Content>,
};
