// components/SearchBox/SearchBox.tsx

import styles from './SearchBox.module.css';

interface SearchBoxProps {
  search: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchBox({ search, onChange }: SearchBoxProps) {
  return (
    <input
      defaultValue={search}
      onChange={onChange}
      className={styles.input}
      type="text"
      placeholder="Search notes"
    />
  );
}
