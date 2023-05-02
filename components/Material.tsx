import { useState, useEffect } from "react";
import { VariationConfiguratorPlugin } from "webgi";

export default function Material({ name, config }: { name: string; config: VariationConfiguratorPlugin }) {
  const [icons, setIcons] = useState<string[]>([]);
  const [selected, setSelected] = useState(-1);

  function apply(index: number) {
    if (selected == index) return;
    setSelected(index);
    const material = config.variations.materials.find((obj) => obj.name == name)!;
    config.applyVariation(material, index, "materials");
  }

  useEffect(() => {
    if (!config) return;
    setIcons(config.variations.materials.find((obj) => obj.name == name)?.icons!);
  }, [config]);

  return (
    <div className="flex flex-col">
      <p className="text-xl">{name}</p>
      <div className="flex flex-row gap-4 mt-3">
        {icons.map((icon, i) => (
          <MaterialVariation key={icon + i} icon={icon} index={i} selected={selected === i} onClick={apply} />
        ))}
      </div>
    </div>
  );
}

function MaterialVariation({ icon, index, onClick, selected }: { icon: string; index: number; onClick: any; selected: boolean }) {
  return (
    <button
      className={`p-6 border-2 rounded-full hover:border-black ${selected && "border-black"}`}
      style={{ backgroundColor: icon }}
      onClick={() => onClick(index)}
    ></button>
  );
}
