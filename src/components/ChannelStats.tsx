'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Users, Eye, Film, Calendar } from 'lucide-react';
import { useTranslations } from 'next-intl';

/* ── Hardcoded fallback data (source of truth from YouTube About page) ── */
const FALLBACK = {
    subscribers: '6,1K',
    views: '700 mil',
    videos: '1.300',
};

/* ── Channel anniversary ───────────────────────────── */
const CHANNEL_CREATED = new Date('2020-04-10T00:00:00'); // Joined Apr 10, 2020

function getChannelAge() {
    const now = new Date();
    const years = now.getFullYear() - CHANNEL_CREATED.getFullYear();
    const hadBirthday =
        now.getMonth() > CHANNEL_CREATED.getMonth() ||
        (now.getMonth() === CHANNEL_CREATED.getMonth() && now.getDate() >= CHANNEL_CREATED.getDate());
    return hadBirthday ? years : years - 1;
}

function getDaysToAnniversary() {
    const now = new Date();
    const thisYear = now.getFullYear();
    let nextAnniversary = new Date(thisYear, CHANNEL_CREATED.getMonth(), CHANNEL_CREATED.getDate());
    if (nextAnniversary <= now) {
        nextAnniversary = new Date(thisYear + 1, CHANNEL_CREATED.getMonth(), CHANNEL_CREATED.getDate());
    }
    const diff = nextAnniversary.getTime() - now.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

/* ── (styles handled by .glow-card in globals.css) ── */

/* ── Stat Card ─────────────────────────────────────── */
interface StatCardProps {
    icon: React.ReactNode;
    label: string;
    value: string;
    delay: number;
    isInView: boolean;
}

function StatCard({ icon, label, value, delay, isInView }: StatCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay, ease: 'easeOut' }}
            className="glow-card"
            whileHover={{ scale: 1.05 }}
        >
            <div
                className="glow-card-fill"
                style={{
                    padding: '24px 20px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    gap: '12px',
                    cursor: 'default',
                }}
            >
                <div
                    style={{
                        width: '52px', height: '52px', borderRadius: '50%',
                        border: '2px solid #f97316', display: 'flex',
                        alignItems: 'center', justifyContent: 'center',
                        backgroundColor: 'rgba(0,0,0,0.4)',
                    }}
                >
                    {icon}
                </div>
                <span
                    className="font-pixel"
                    style={{ color: '#f97316', fontSize: '22px', letterSpacing: '0.05em' }}
                >
                    {value}
                </span>
                <span
                    className="font-mono"
                    style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', letterSpacing: '0.08em', textTransform: 'uppercase' }}
                >
                    {label}
                </span>
            </div>
        </motion.div>
    );
}

/* ── Main Component ────────────────────────────────── */

export default function ChannelStats() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-60px' });
    const t = useTranslations('ChannelStats');

    const channelAge = getChannelAge();
    const daysToAnniversary = getDaysToAnniversary();

    return (
        <section
            ref={ref}
            className="relative z-10"
            style={{ padding: '40px 24px 20px' }}
        >
            <div style={{ width: '100%', maxWidth: '900px', margin: '0 auto' }}>
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                        gap: '16px',
                    }}
                >
                    <StatCard
                        icon={<Users size={22} color="#f97316" />}
                        label={t('subscribers')}
                        value={FALLBACK.subscribers}
                        delay={0.1}
                        isInView={isInView}
                    />
                    <StatCard
                        icon={<Eye size={22} color="#f97316" />}
                        label={t('views')}
                        value={FALLBACK.views}
                        delay={0.2}
                        isInView={isInView}
                    />
                    <StatCard
                        icon={<Film size={22} color="#f97316" />}
                        label={t('videos')}
                        value={FALLBACK.videos}
                        delay={0.3}
                        isInView={isInView}
                    />
                    <StatCard
                        icon={<Calendar size={22} color="#f97316" />}
                        label={daysToAnniversary <= 30 ? t('yearsIn', { years: channelAge + 1 }) : t('yearsOfChannel', { years: channelAge })}
                        value={daysToAnniversary <= 30 ? t('daysExclaim', { days: daysToAnniversary }) : t('days', { days: daysToAnniversary })}
                        delay={0.4}
                        isInView={isInView}
                    />
                </div>
            </div>
        </section>
    );
}
