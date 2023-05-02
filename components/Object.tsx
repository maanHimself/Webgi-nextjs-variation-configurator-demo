import { useState, useEffect } from "react";
import { VariationConfiguratorPlugin } from "webgi";

export default function Object({ name, config }: { name: string; config: VariationConfiguratorPlugin }) {
  const [icons, setIcons] = useState<string[]>([]);
  const [selected, setSelected] = useState(-1);

  function apply(index: number) {
    if (selected == index) return;
    setSelected(index);
    const object = config.variations.objects.find((obj) => obj.name == name)!;
    config.applyVariation(object, index, "objects");
  }

  useEffect(() => {
    if (!config) return;
    setIcons(config.variations.objects.find((obj) => obj.name == name)?.icons!);
  }, [config]);

  return (
    <div className="flex flex-col">
      <p className="text-xl">{name}</p>
      <div className="flex flex-row gap-4 mt-3">
        {icons.map((icon, i) => (
          <ObjectVariation key={icon + i} name={icon} index={i} selected={selected === i} onClick={apply} />
        ))}
      </div>
    </div>
  );
}

function ObjectVariation({ name, index, onClick, selected }: { name: string; index: number; onClick: any; selected: boolean }) {
  return (
    <button
      className={`p-2 border-2 rounded-lg border-black hover:bg-black hover:text-white ${selected && "bg-black text-white"}`}
      onClick={() => onClick(index)}
    >
      {name}
    </button>
  );
}
