import styles from "./styles/Chart.module.css";
function ListChart({
  title,
  subtitle,
  data,
  showLegend = true,
  legends = [],
  isLoading = false,
}: {
  title: string;
  subtitle?: string;
  data: Array<{ label: string; value: number }>;
  showLegend?: boolean;
  legends?: Array<{ label: string; color: string }>;
  isLoading?: boolean;
}) {
  if (isLoading) {
    return (
      <section className={styles.chart}>
        <div className={styles.header}>
          <div className={styles.title_container}>
            <div className={`${styles.skeleton} ${styles.skeleton_title}`} />
            {subtitle && (
              <div
                className={`${styles.skeleton} ${styles.skeleton_subtitle}`}
              />
            )}
          </div>
        </div>
        <div className={styles.skeleton_list}>
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className={`${styles.skeleton} ${styles.skeleton_list_item}`}
            />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className={styles.chart}>
      <div className={styles.header}>
        <div className={styles.title_container}>
          <h3
            className={`${styles.title} ${subtitle ? styles.title_with_subtitle : ""}`}
          >
            {title}
          </h3>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
        {showLegend && (
          <div className={styles.legend}>
            {legends.map((l, i) => (
              <div key={i} className={styles.legend_item}>
                <div
                  className={styles.legend_dot}
                  style={{ background: l.color }}
                />
                <span className={styles.legend_label}>{l.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className={styles.list_container}>
        {data.map((item, index) => (
          <div key={index} className={styles.list_item}>
            <span className={styles.list_label}>{item.label}</span>
            <span className={styles.list_value}>
              {item.value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ListChart;
