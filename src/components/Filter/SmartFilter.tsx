"use client";

import FilterIcon from "@/icons/FilterIcon";
import { useState, useRef, useEffect } from "react";
import styles from "./styles/SmartFilter.module.css";

interface FilterOptions {
  categories: {
    [key: string]: boolean;
  };
}

const CATEGORY_OPTIONS = [
  { id: "salary", label: "Salary" },
  { id: "institutions", label: "Institutions" },
  { id: "culture", label: "Culture" },
  { id: "interview", label: "Interview" },
];

function SmartFilter({
  onFilterChange,
}: {
  onFilterChange?: (filters: FilterOptions) => void;
}) {
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    categories: {
      salary: false,
      institutions: false,
      culture: false,
      interview: false,
    },
  });
  const panelRef = useRef<HTMLDivElement>(null);

  // Close panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const handleCategoryChange = (categoryId: string) => {
    setFilters((prev) => ({
      ...prev,
      categories: {
        ...prev.categories,
        [categoryId]: !prev.categories[categoryId],
      },
    }));
  };

  const handleApply = () => {
    onFilterChange?.(filters);
    setOpen(false);
  };

  const handleClear = () => {
    const clearedFilters: FilterOptions = {
      categories: {
        salary: false,
        institutions: false,
        culture: false,
        interview: false,
      },
    };
    setFilters(clearedFilters);
    onFilterChange?.(clearedFilters);
  };

  const activeFilterCount = Object.values(filters.categories).filter(
    Boolean,
  ).length;

  return (
    <section className={styles.filter_container} ref={panelRef}>
      <button className={styles.filter_button} onClick={() => setOpen(!open)}>
        <FilterIcon />

        {activeFilterCount > 0 && <span>({activeFilterCount})</span>}
      </button>

      {open && (
        <div className={styles.filter_panel}>
          <div className={styles.filter_section}>
            <h4 className={styles.filter_section_title}>Review Categories</h4>
            <div className={styles.filter_options}>
              {CATEGORY_OPTIONS.map((option) => (
                <div key={option.id} className={styles.filter_checkbox}>
                  <input
                    type="checkbox"
                    id={`filter-${option.id}`}
                    checked={filters.categories[option.id]}
                    onChange={() => handleCategoryChange(option.id)}
                  />
                  <label htmlFor={`filter-${option.id}`}>{option.label}</label>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.filter_actions}>
            <button
              className={styles.filter_button_apply}
              onClick={handleApply}
            >
              Apply
            </button>
            <button
              className={styles.filter_button_clear}
              onClick={handleClear}
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default SmartFilter;
