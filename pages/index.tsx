import { useEffect, useState } from "react";
import Webgi from "../components/WebgiLoader";
import Material from "../components/Material";
import Object from "../components/Object";
import { VariationConfiguratorPlugin } from "webgi";

export default function Home() {
  const [objects, setObjects] = useState<string[]>([]);
  const [materials, setMaterials] = useState<string[]>([]);
  const [config, setConfig] = useState<VariationConfiguratorPlugin>();

  useEffect(() => {
    if (config) {
      setObjects(config.getObjectVariations());
      setMaterials(config.getMaterialVariations());
    }
  }, [config]);

  return (
    <div className="flex flex-row w-full h-full">
      <div className="w-3/5 h-screen">
        <Webgi {...{ setConfig }} />
      </div>
      <div id="ui" className="flex flex-col w-auto h-full justify-end items-center p-3 gap-10">
        <div className="flex flex-col w-full top-0 justify-center gap-10">
          {objects.map((obj) => {
            return <Object key={obj} name={obj} config={config!} />;
          })}
          {materials.map((mat) => {
            return <Material key={mat} name={mat} config={config!} />;
          })}
        </div>
      </div>
    </div>
  );
}
