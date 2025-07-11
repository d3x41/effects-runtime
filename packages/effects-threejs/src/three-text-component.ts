/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */
import type { Engine } from '@galacean/effects-core';
import { math, effectsClass, spec, applyMixins, canvasPool, TextComponentBase } from '@galacean/effects-core';
import { ThreeSpriteComponent } from './three-sprite-component';

export interface ThreeTextComponent extends TextComponentBase { }

/**
 * @since 2.0.0
 */
@effectsClass(spec.DataType.TextComponent)
export class ThreeTextComponent extends ThreeSpriteComponent {
  isDirty = true;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D | null;

  constructor (engine: Engine, props?: spec.TextContent) {
    super(engine, props as unknown as spec.SpriteComponentData);

    this.canvas = canvasPool.getCanvas();
    canvasPool.saveCanvas(this.canvas);
    this.context = this.canvas.getContext('2d', { willReadFrequently: true });

    if (!props) {
      return;
    }

    const { options } = props;

    this.updateWithOptions(options);
    this.updateTexture();
  }

  override onUpdate (dt: number): void {
    super.onUpdate(dt);
    this.updateTexture();
  }

  override fromData (data: spec.SpriteComponentData): void {
    super.fromData(data);
    const options = data.options as spec.TextContentOptions;

    // TextComponentBase
    this.updateWithOptions(options);
    // Text
    this.updateTexture();
    // 恢复默认颜色
    this.material.setColor('_Color', new math.Color(1, 1, 1, 1));

  }

  updateWithOptions (options: spec.TextContentOptions) {
    // OVERRIDE by mixins
  }

  updateTexture (flipY = true) {
    // OVERRIDE by mixins
  }
}

applyMixins(ThreeTextComponent, [TextComponentBase]);
