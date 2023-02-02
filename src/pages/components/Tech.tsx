import {
  IconFramer,
  IconMDX,
  IconNextJS,
  IconSass,
} from "component/utility/AnimatedIcons";

export default function Tech({ styles }: { styles: any }) {
  const TECH_LIST = [
    {
      name: "nextjs",
      icon: IconNextJS,
      description:
        "nextjs was used to create the front-end code for this site. this library was developed by vercel, which is used to host this project.",
    },
    {
      name: "sass",
      icon: IconSass,
      description:
        "sass is a variation of css that allows for more versatility and functionality. this is my first time using sass and i don't see myself going back to vanilla css any time soon.",
    },
    {
      name: "framer motion",
      icon: IconFramer,
      description:
        "this library was used to create the animations present on the site. great for someone like me who is not the best with css animations!",
    },
    {
      name: "mdx",
      icon: IconMDX,
      description:
        "mdx is an upgraded version of markdown that allows for the use of react components in the file. this will be used to create blog-like posts on the site.",
    },
  ];

  function TechItem({ tech }: { tech: any }) {
    const ICON_SIZE = 60;
    return (
      <div className={styles.techItem}>
        <div className={styles.techIcon}>
          <tech.icon size={ICON_SIZE} strokeWidth={1} />
        </div>
        <div className={styles.techName}>{tech.name}</div>
        <div className={styles.techDescription}>{tech.description}</div>
      </div>
    );
  }

  return (
    <div className={styles.technologies}>
      <h2 className={styles.heading2}>technologies used</h2>
      <div className={styles.tech}>
        {TECH_LIST.map((tech) => (
          <TechItem tech={tech} key={tech.name} />
        ))}
      </div>
    </div>
  );
}
