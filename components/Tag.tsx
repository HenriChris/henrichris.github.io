import styles from './Tag.module.css';

interface Props { children: React.ReactNode; }

export default function Tag({ children }: Props) {
    return <span className={styles.tag}>{children}</span>;
}
