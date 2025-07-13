type StatItem = {
  label: string;
  value: string;
  hint?: string;
  locked?: boolean;
};

const statsLeft: StatItem[] = [
  { label: "Total Gain/Loss", value: "-$11.51" },
  { label: "Average Daily Gain/Loss", value: "-$1.44" },
  { label: "Average Trade Gain/Loss", value: "-$0.89" },
  { label: "Total Number of Trades", value: "13" },
  { label: "Average Hold Time (scratch trades)", value: "0" },
  { label: "Number of Scratch Trades", value: "0" },
  { label: "Trade P&L Standard Deviation", value: "$7.84" },
  { label: "Kelly Percentage", value: "🔒", locked: true },
  { label: "Total Commissions", value: "🔒", locked: true },
  { label: "Average position MAE", value: "🔒", locked: true },
];

const statsRight: StatItem[] = [
  { label: "Largest Gain", value: "$10.50" },
  { label: "Largest Loss", value: "-$13.65" },
  { label: "Average Daily Volume", value: "124" },
  { label: "Average Per-share Gain/Loss", value: "-$0.02" },
  { label: "Average Winning Trade", value: "$6.35" },
  { label: "Average Losing Trade", value: "-$7.08" },
  { label: "Number of Winning Trades", value: "6 (46.2%)" },
  { label: "Number of Losing Trades", value: "7 (53.8%)" },
  { label: "Average Hold Time (winning trades)", value: "13 minutes" },
  { label: "Average Hold Time (losing trades)", value: "14 minutes" },
  { label: "Max Consecutive Wins", value: "2" },
  { label: "Max Consecutive Losses", value: "2" },
  { label: "System Quality Number (SQN)", value: "🔒", locked: true },
  { label: "K-Ratio", value: "🔒", locked: true },
  { label: "Total Fees", value: "🔒", locked: true },
  { label: "Probability of Random Chance", value: "🔒", locked: true },
  { label: "Profit factor", value: "0.77" },
];
export default function StatTable() {
  return (
    <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm px-4">
      <h2 className="text-lg font-medium mb-4">Full Statistics</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          {statsLeft.map((stat, idx) => (
            <div key={idx} className="flex justify-between">
              <span className="text-sm text-muted-foreground">
                {stat.label}
              </span>
              <span
                className={`text-sm font-medium ${
                  stat.locked ? "opacity-50" : ""
                }`}
              >
                {stat.value}
              </span>
            </div>
          ))}
        </div>
        <div className="space-y-2">
          {statsRight.map((stat, idx) => (
            <div key={idx} className="flex justify-between">
              <span className="text-sm text-muted-foreground">
                {stat.label}
              </span>
              <span
                className={`text-sm font-medium ${
                  stat.locked ? "opacity-50" : ""
                }`}
              >
                {stat.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
