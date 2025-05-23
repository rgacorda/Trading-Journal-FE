import MainDashboard from "../_components/main/main";

export default function SiteDashboardPage({
  params,
}: {
  params: { site: string };
}) {
  switch (params.site) {
    case "main":
      return <MainDashboard />;
      break;

    default:
      return <>{params.site}</>
      break;
  }
}
