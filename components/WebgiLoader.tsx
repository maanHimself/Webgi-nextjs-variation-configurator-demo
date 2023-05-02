import dynamic from "next/dynamic";

//@ts-ignore
const DynamicHeader = dynamic(() => import("./WebgiApp.tsx"), {
  ssr: false,
});

export default function Webgi(props: any) {
  return <DynamicHeader {...props} />;
}
