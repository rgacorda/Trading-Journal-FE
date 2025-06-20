import AccountDashboard from "../_features/accounts/accounts";
import MainDashboard from "../_features/main/main";
import TradeDashboard from "../_features/trades/trades";

export default async function SiteDashboardPage({
  params,
}: {
  params: Promise<{ site: string }>;
}) {
  const { site } = await params;
  switch (site) {
    case "main":
      return <MainDashboard />;
      break;
    case "trades":
      return <TradeDashboard/>
      break;
    case "accounts":
      return <AccountDashboard />;
      break;
    default:
      return <>{site}</>;
      break;
  }
}
