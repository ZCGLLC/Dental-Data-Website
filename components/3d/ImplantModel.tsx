"use client";

import { brand } from "@/config/brand";
import { GltfImplant } from "@/components/3d/GltfImplant";
import {
  ProceduralImplant,
  type ImplantRefs,
} from "@/components/3d/ProceduralImplant";
import type { PartId } from "@/data/content";

type Props = ImplantRefs & {
  wire?: boolean;
  onHover?: (part: PartId | null) => void;
  reduced?: boolean;
};

export function ImplantModel(props: Props) {
  if (brand.assets.useExternalImplantModel) {
    return <GltfImplant explode={props.explode} hover={props.hover} />;
  }
  return <ProceduralImplant {...props} />;
}
