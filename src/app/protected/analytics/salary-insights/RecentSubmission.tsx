import FormatCurrency from "@/components/Currency/FormatCurrency";
import FormatDate from "@/components/date/FormatDate";
import Image from "next/image";
import React from "react";
import styles from "./styles/SalaryInsight.module.css";

function RecentSubmission() {
  const data = [
    // Sample data for recent submissions
    {
      id: 1,
      position: "Software Engineer",
      company: "Tech Corp",
      salary: 80000,
      date: "2024-06-01",
      location: "Lagos, NIG",
    },
    {
      id: 2,
      position: "Product Manager",
      company: "Business Inc",
      salary: 95000,
      date: "2024-05-28",
      location: "Lagos, NIG",
    },
    {
      id: 3,
      position: "Data Scientist",
      company: "DataWorks",
      salary: 110000,
      date: "2024-05-25",
      location: "Lagos, NIG",
    },
    {
      id: 4,
      position: "UX Designer",
      company: "Creative Studio",
      salary: 70000,
      date: "2024-05-20",
      location: "Lagos, NIG",
    },
  ];
  return (
    <div className={styles.recent_submission}>
      <h2 className={styles.heading}>Recent Salary Submissions</h2>
      <div className={styles.submission_list}>
        {data.map((submission) => (
          <div key={submission.id} className={styles.submission_item}>
            <div className={styles.left_section}>
              <div className={styles.image_container}>
                <Image
                  src={"/sample.png"}
                  width={50}
                  height={50}
                  alt="Company Logo"
                />
              </div>
              <div className={styles.submission_details}>
                <h3>{submission.position}</h3>
                <div className={styles.flexible}>
                  <span className={styles.date}>
                    <FormatDate
                      date={submission.date}
                      options={{ asShortMonthDayYear: true }}
                    />
                  </span>
                  <span className={styles.location}>{submission.location}</span>
                </div>
              </div>
            </div>
            <div className={styles.salary}>
              <FormatCurrency
                value={submission.salary}
                currency="NGN"
                showFraction={false}
                useCurrencySymbol={true}
                compact={false}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentSubmission;
