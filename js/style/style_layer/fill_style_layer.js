'use strict';

const assert = require('assert');
const StyleLayer = require('../style_layer');
const FillBucket = require('../../data/bucket/fill_bucket');

class FillStyleLayer extends StyleLayer {

    getPaintValue(name, globalProperties, featureProperties) {
        if (name === 'fill-outline-color') {
            // Special-case handling when transitioning either to or from an
            // undefined fill-outline-color values
            let transition = this._paintTransitions['fill-outline-color'];
            while (transition) {
                const declaredValue = (
                    transition &&
                    transition.declaration &&
                    transition.declaration.value
                );

                if (!declaredValue) {
                    return super.getPaintValue('fill-color', globalProperties, featureProperties);
                }

                assert(transition !== transition.oldTransition);
                transition = transition.oldTransition;
            }
        }

        return super.getPaintValue(name, globalProperties, featureProperties);
    }

    getPaintValueStopZoomLevels(name) {
        if (name === 'fill-outline-color' && this.getPaintProperty('fill-outline-color') === undefined) {
            return super.getPaintValueStopZoomLevels('fill-color');
        } else {
            return super.getPaintValueStopZoomLevels(name);
        }
    }

    getPaintInterpolationT(name, globalProperties) {
        if (name === 'fill-outline-color' && this.getPaintProperty('fill-outline-color') === undefined) {
            return super.getPaintInterpolationT('fill-color', globalProperties);
        } else {
            return super.getPaintInterpolationT(name, globalProperties);
        }
    }

    isPaintValueFeatureConstant(name) {
        if (name === 'fill-outline-color' && this.getPaintProperty('fill-outline-color') === undefined) {
            return super.isPaintValueFeatureConstant('fill-color');
        } else {
            return super.isPaintValueFeatureConstant(name);
        }
    }

    isPaintValueZoomConstant(name) {
        if (name === 'fill-outline-color' && this.getPaintProperty('fill-outline-color') === undefined) {
            return super.isPaintValueZoomConstant('fill-color');
        } else {
            return super.isPaintValueZoomConstant(name);
        }
    }

    createBucket(options) {
        return new FillBucket(options);
    }
}

module.exports = FillStyleLayer;
