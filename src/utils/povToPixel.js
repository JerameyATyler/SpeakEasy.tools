/**
 *
 * Snippets taken from PanoMarker by Martin Matysiak
 * Edited from original to fit into this Panoramic Scenes React project
 * Mathematics for calculating the positioning of Street View marker
 *
 * @param {StreetViewPov} targetPov     Heading/pitch marker to be placed at
 * @param {StreetViewPov} currentPov    Heading/pitch window is centered toward
 * @param {Element} viewport            Reference to Street View container
 * @return {Object}                     Top and Left offsets for the given viewport that point to
 *                                          the desired point-of-view.
 *
 */

/**
 * PanoMarker
 * Version 1.0
 *
 * @author kaktus621@gmail.com (Martin Matysiak)
 * @fileoverview A marker that can be placed inside custom StreetView panoramas.
 * Regular markers inside StreetViewPanoramas can only be shown vertically
 * centered and aligned to LatLng coordinates.
 *
 * Custom StreetView panoramas usually do not have any geographical information
 * (e.g. inside views), thus a different method of positioning the marker has to
 * be used. This class takes simple heading and pitch values from the panorama's
 * center in order to move the marker correctly with the user's viewport
 * changes.
 *
 * Since something like that is not supported natively by the Maps API, the
 * marker actually sits on top of the panorama, DOM-wise outside of the
 * actual map but still inside the map container.
 */

/**
 * @license Copyright 2014 — 2015 Martin Matysiak.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * According to the documentation (goo.gl/WT4B57), the field-of-view angle
 * should precisely follow the curve of the form 180/2^zoom. Unfortunately, this
 * is not the case in practice in the 3D environment. From experiments, the
 * following FOVs seem to be more correct:
 *
 *        Zoom | best FOV | documented FOV
 *       ------+----------+----------------
 *          0  | 126.5    | 180
 *          1  | 90       | 90
 *          2  | 53       | 45
 *          3  | 28       | 22.5
 *          4  | 14.25    | 11.25
 *          5  | 7.25     | not specified
 *
 * Because of this, we are doing a linear interpolation for zoom values <= 2 and
 * then switch over to an inverse exponential. In practice, the produced
 * values are good enough to result in stable marker positioning, even for
 * intermediate zoom values.
 *
 * @return {number} The (horizontal) field of view angle for the given zoom.
 */
const get3dFov = (zoom) => {
  return zoom <= 2
    ? 126.5 - zoom * 36.75 // linear descent
    : 195.93 / Math.pow(1.92, zoom); // parameters determined experimentally
};

const povToPixel3d = (targetPov, currentPov, viewport) => {
  viewport = viewport ? viewport : { offsetHeight: 0, offsetWidth: 0 };
  var width = viewport.offsetWidth;
  var height = viewport.offsetHeight;
  var target = {
    left: width / 2,
    top: height / 2,
  };

  var DEG_TO_RAD = Math.PI / 180.0;
  var fov = get3dFov(currentPov.zoom) * DEG_TO_RAD;
  var h0 = currentPov.heading * DEG_TO_RAD;
  var p0 = currentPov.pitch * DEG_TO_RAD;
  var h = targetPov.heading * DEG_TO_RAD;
  var p = targetPov.pitch * DEG_TO_RAD;

  // f = focal length = distance of current POV to image plane
  var f = width / 2 / Math.tan(fov / 2);

  // our coordinate system: camera at (0,0,0), heading = pitch = 0 at (0,f,0)
  // calculate 3d coordinates of viewport center and target
  var cos_p = Math.cos(p);
  var sin_p = Math.sin(p);

  var cos_h = Math.cos(h);
  var sin_h = Math.sin(h);

  var x = f * cos_p * sin_h;
  var y = f * cos_p * cos_h;
  var z = f * sin_p;

  var cos_p0 = Math.cos(p0);
  var sin_p0 = Math.sin(p0);

  var cos_h0 = Math.cos(h0);
  var sin_h0 = Math.sin(h0);

  var x0 = f * cos_p0 * sin_h0;
  var y0 = f * cos_p0 * cos_h0;
  var z0 = f * sin_p0;

  var nDotD = x0 * x + y0 * y + z0 * z;
  var nDotC = x0 * x0 + y0 * y0 + z0 * z0;

  // nDotD == |targetVec| * |currentVec| * cos(theta)
  // nDotC == |currentVec| * |currentVec| * 1
  // Note: |currentVec| == |targetVec| == f

  // Sanity check: the vectors shouldn't be perpendicular because the line
  // from camera through target would never intersect with the image plane
  if (Math.abs(nDotD) < 1e-6) {
    return null;
  }

  // t is the scale to use for the target vector such that its end
  // touches the image plane. It's equal to 1/cos(theta) ==
  //     (distance from camera to image plane through target) /
  //     (distance from camera to target == f)
  var t = nDotC / nDotD;

  // Sanity check: it doesn't make sense to scale the vector in a negative
  // direction. In fact, it should even be t >= 1.0 since the image plane
  // is always outside the pano sphere (except at the viewport center)
  if (t < 0.0) {
    return null;
  }

  // (tx, ty, tz) are the coordinates of the intersection point between a
  // line through camera and target with the image plane
  var tx = t * x;
  var ty = t * y;
  var tz = t * z;

  // u and v are the basis vectors for the image plane
  var vx = -sin_p0 * sin_h0;
  var vy = -sin_p0 * cos_h0;
  var vz = cos_p0;

  var ux = cos_h0;
  var uy = -sin_h0;
  var uz = 0;

  // normalize horiz. basis vector to obtain orthonormal basis
  var ul = Math.sqrt(ux * ux + uy * uy + uz * uz);
  ux /= ul;
  uy /= ul;
  uz /= ul;

  // project the intersection point t onto the basis to obtain offsets in
  // terms of actual pixels in the viewport
  var du = tx * ux + ty * uy + tz * uz;
  var dv = tx * vx + ty * vy + tz * vz;

  // use the calculated pixel offsets
  target.left += du;
  target.top -= dv;

  target.left = target.left + "px";
  target.top = target.top + "px";

  //   console.log("target3d", target);
  // return target;
  return target;
};

/**
 * Helper function that converts the heading to be in the range [-180,180).
 *
 * @param {number} heading The heading to convert.
 */
const wrapHeading = (heading) => {
  // We shift to the range [0,360) because of the way JS behaves for modulos of
  // negative numbers.
  heading = (heading + 180) % 360;

  // Determine if we have to wrap around
  if (heading < 0) {
    heading += 360;
  }

  return heading - 180;
};

/**
 * A simpler version of povToPixel2d which does not have to do the spherical
 * projection because the raw StreetView tiles are just panned around when the
 * user changes the viewport position.
 *
 * @param {StreetViewPov} targetPov The point-of-view whose coordinates are
 *     requested.
 * @param {StreetViewPov} currentPov POV of the viewport center.
 * @param {Element} viewport The current viewport containing the panorama.
 * @return {Object} Top and Left offsets for the given viewport that point to
 *     the desired point-of-view.
 */
const povToPixel2d = (targetPov, currentPov, viewport) => {
  // Gather required variables
  viewport = viewport ? viewport : { offsetHeight: 0, offsetWidth: 0 };

  var width = viewport.offsetWidth || 0;
  var height = viewport.offsetHeight || 0;
  var target = {
    left: width / 2,
    top: height / 2,
  };

  // In the 2D environment, the FOV follows the documented curve.
  var hfov = 180 / Math.pow(2, currentPov.zoom);
  var vfov = hfov * (height / width);
  var dh = wrapHeading(targetPov.heading - currentPov.heading);
  var dv = targetPov.pitch - currentPov.pitch;

  target.left += (dh / hfov) * width;
  target.top -= (dv / vfov) * height;

  target.left = target.left + "px";
  target.top = target.top + "px";
  //   console.log("target2d", target);
  return target;
};

const povToPixel_ = !!window.chrome ? povToPixel3d : povToPixel2d;

export default povToPixel_;
