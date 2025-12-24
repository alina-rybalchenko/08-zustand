import css from './Layout.module.css';

interface NotesLayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}

export default function NotesLayout({ children, sidebar }: NotesLayoutProps) {
  return (
    <section className={css.section}>
      <aside className={css.sidebar}> {sidebar} </aside>
      <div className={css.notesWrapper}>{children}</div>
    </section>
  );
}
