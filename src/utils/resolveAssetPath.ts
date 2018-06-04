/**
 * @file Resolves fingerprinted asset paths using the generated asset manifest
 *       file.
 */

import path from 'path';

/**
 * Fetches the fingerprinted path of an asset using the provided manifest
 * object. If no manifest object is provided, the path is simply normalized and
 * returned.
 *
 * @param {string} pathToResolve - The asset path to resolve.
 * @param {Object} [options] - Options.
 * @param {string} [options.publicPath=`/`] - The public path to prefix the
 *                                            resolved paths.
 * @param {Object} [options.manifest] - The manifest object with asset path
 *                                      mapping.
 *
 * @return {string} The resolved path.
 */
export default function resolveAssetPath(pathToResolve, { publicPath = `/`, manifest }: any = {}) {
  const normalizedPath = path.join.apply(null, pathToResolve.split(`/`));

  let output = normalizedPath;

  if (manifest && manifest.hasOwnProperty(normalizedPath)) {
    output = manifest[normalizedPath];
  }
  else if (manifest && manifest.hasOwnProperty(`${publicPath}${normalizedPath}`)) {
    output = manifest[`${publicPath}${normalizedPath}`];
  }

  if (!output.startsWith(publicPath)) output = `${publicPath}${output}`;

  return output;
}