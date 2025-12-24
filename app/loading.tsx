// app/loading.tsx
import css from '@/components/Loader/Loader.module.css';

export default function Loading() {
  return (
    <div className={css.loaderWrapper}>
      <div className={css.loaderBar}></div>
    </div>
  );
}
