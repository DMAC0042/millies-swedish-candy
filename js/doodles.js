/* ================================================
   MILLIE'S - Painted candy set
   Drawn from close-up photos of the candy mural in the
   shop. Mural painting style: every colour has a darker
   band around its edge and a lighter middle, "BUBS"
   lettering is outlined in the darker shade, and sour
   candies get white sugar speckles.

   The six mural candies:
     d-skull   pink / blue sour skull (side profile)
     d-skull2  yellow / red sour skull (side profile)
     d-diamond yellow / green "BUBS" diamond
     d-bubs    yellow / taupe "BUBS" oval
     d-drop    white / pink oval with rings
     d-stick   cream stick with raspberry stripes
   Injected once per page so <use href="#d-name"> works
   even when the site is opened straight from disk.
   ================================================ */
(function () {
  var Y = '#E5DB98', BR = '#7A6D5F', LI = '#C8A0C8', PK = '#F3B6E4',
      BL = '#80BFEA', TE = '#7FA8A6', RD = '#FF6969',
      CR = '#FFFFED', W = '#FFFFFF';

  /* sugar: white speckles of mixed size, plus a few darker pits */
  function sugar(points, pit) {
    return points.map(function (p, i) {
      var r = [1.5, 1, 0.7, 1.2][i % 4];
      return '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="' + r + '" fill="' + W + '"/>';
    }).join('') + (pit ? pit.map(function (p) {
      return '<circle cx="' + p[0] + '" cy="' + p[1] + '" r=".6" fill="' + p[2] + '" opacity=".7"/>';
    }).join('') : '');
  }

  /* one half of a two-tone candy: light fill, dark edge band, clipped to its side */
  function half(d, clip, fill, edge, extra) {
    return '<g clip-path="url(#' + clip + ')">' +
      '<path d="' + d + '" fill="' + fill + '" stroke="' + edge + '" stroke-width="4.5" stroke-linejoin="round"/>' +
      (extra || '') + '</g>';
  }

  /* Sour skull, side profile facing left, bone at the jaw (as painted on the wall) */
  var skullD = 'M34 4C47 4 57 13 57 25c0 8-3 13-7 17 3 2 5 5 4 9 3 2 3 7-1 9-3 2-6 0-7-2H28c-2 3-7 4-10 2-4 2-9-1-8-5-3-2-2-7 1-8-2-3-1-7 2-8-3-2-5-5-3-8 2-3 4-4 4-7C14 12 22 4 34 4z';
  function skull(id, lf, le, rf, re) {
    var detail = function (edge) {
      return '<path d="M15 40c6-2 11 0 15 2M12 49c10-2 26-2 38 1" fill="none" stroke="' + edge + '" stroke-width="1.8" stroke-linecap="round"/>' +
        '<text x="35" y="16" text-anchor="middle" font-family="Arial Black, Arial, sans-serif" font-weight="900" font-size="8.5" fill="none" stroke="' + edge + '" stroke-width=".9" transform="rotate(8 35 16)">BUBS</text>';
    };
    return '<symbol id="' + id + '" viewBox="0 0 64 64">' +
      half(skullD, 'cl-left', lf, le, detail(le)) +
      half(skullD, 'cl-right', rf, re, detail(re)) +
      '<circle cx="24" cy="27" r="3.6" fill="' + CR + '" stroke="' + le + '" stroke-width="1.6"/>' +
      '<circle cx="41" cy="28" r="4" fill="' + CR + '" stroke="' + re + '" stroke-width="1.6"/>' +
      sugar([[20, 15], [27, 9], [45, 12], [51, 22], [49, 35], [18, 33], [29, 34], [38, 40], [22, 54], [44, 55], [14, 45], [35, 22], [47, 46], [30, 50]],
            [[24, 20, le], [42, 18, re], [33, 46, re], [18, 47, le]]) +
      '</symbol>';
  }

  var sprite =
    '<svg xmlns="http://www.w3.org/2000/svg" style="position:absolute;width:0;height:0;overflow:hidden" aria-hidden="true">' +
    '<defs>' +
    '<clipPath id="cl-left"><rect x="0" y="0" width="32" height="64"/></clipPath>' +
    '<clipPath id="cl-right"><rect x="32" y="0" width="32" height="64"/></clipPath>' +
    '<clipPath id="cl-top"><path d="M0 0h64v31c-10 3-20-1-32 2S8 34 0 33z"/></clipPath>' +
    '<clipPath id="cl-bottom"><path d="M0 33c8 1 20 1 32-2s22 1 32-2v35H0z"/></clipPath>' +
    '<clipPath id="cl-dl"><path d="M0 0h29l9 64H0z"/></clipPath>' +
    '<clipPath id="cl-dr"><path d="M29 0h35v64H38z"/></clipPath>' +
    '</defs>' +

    /* --- the mural candies --- */
    skull('d-skull', '#F2A9D3', '#DE7FBE', '#7EC3E6', '#3E9CC4') +
    skull('d-skull2', '#E9C33E', '#CFA22A', '#D8433E', '#AE2A2C') +

    /* Yellow / taupe BUBS oval, big outlined letters, no sugar */
    (function () {
      var o = 'M32 13c15 0 27 8 27 19S47 51 32 51 5 43 5 32s12-19 27-19z';
      var letters = function (edge) {
        return '<text x="32" y="38.5" text-anchor="middle" font-family="Arial Black, Arial, sans-serif" font-weight="900" font-size="17" fill="none" stroke="' + edge + '" stroke-width="1.6" stroke-linejoin="round">BUBS</text>';
      };
      return '<symbol id="d-bubs" viewBox="0 0 64 64"><g transform="rotate(-14 32 32)">' +
        half(o, 'cl-top', '#FBF2A0', '#E2D96E', letters('#E2D96E')) +
        half(o, 'cl-bottom', '#A8957C', '#7E654A', letters('#7E654A')) +
        '</g></symbol>';
    })() +

    /* Yellow / green leaning BUBS diamond */
    (function () {
      var d = 'M14 16h28c3 0 4 1 5 3l11 23c1 3 0 5-3 5H27c-3 0-4-1-5-3L10 21c-1-3 1-5 4-5z';
      var t = function (paint) {
        return '<text x="34" y="36" text-anchor="middle" font-family="Arial Black, Arial, sans-serif" font-weight="900" font-size="13" ' + paint + ' transform="rotate(28 34 32)">BUBS</text>';
      };
      return '<symbol id="d-diamond" viewBox="0 0 64 64">' +
        half(d, 'cl-dl', '#EFE58A', '#D6CC55', t('fill="none" stroke="#CFC44C" stroke-width="1.3"')) +
        half(d, 'cl-dr', '#4F9681', '#3F806D', t('fill="#8CB8A6"')) +
        sugar([[20, 20], [24, 30], [30, 42], [17, 27], [40, 21], [47, 28], [52, 40], [44, 44], [36, 24]]) +
        '</symbol>';
    })() +

    /* White / pink oval with painted rings */
    (function () {
      var o = 'M32 16c13 0 24 7 24 16s-11 16-24 16S8 41 8 32s11-16 24-16z';
      var rings = function (edge) {
        return '<path d="M18 30c4-6 20-8 30-2M17 37c6 4 22 5 31-2M24 24c4-2 10-2 14 0" fill="none" stroke="' + edge + '" stroke-width="2" stroke-linecap="round"/>';
      };
      return '<symbol id="d-drop" viewBox="0 0 64 64"><g transform="rotate(-10 32 32)">' +
        half(o, 'cl-left', '#FBF3F7', '#F1D3E4', rings('#F1D3E4')) +
        half(o, 'cl-right', '#E59BCB', '#D477B5', rings('#F2C3E1')) +
        sugar([[36, 22], [44, 26], [50, 32], [40, 40], [46, 42], [36, 34], [52, 37]]) +
        '</g></symbol>';
    })() +

    /* Cream candy stick with raspberry stripes and a pinwheel twist */
    '<symbol id="d-stick" viewBox="0 0 64 64"><g transform="rotate(-32 32 32)">' +
      '<rect x="4" y="22" width="52" height="20" rx="6" fill="#F7EDEE"/>' +
      '<path d="M8 25.5h44M8 32h44M8 38.5h44" stroke="#B8164C" stroke-width="3.6"/>' +
      '<circle cx="54" cy="32" r="9" fill="#F7EDEE"/>' +
      '<path d="M54 32l-6-6.5a9 9 0 0 1 6-2.5zM54 32l6.5-6a9 9 0 0 1 2.5 6zM54 32l6 6.5a9 9 0 0 1-6 2.5zM54 32l-6.5 6a9 9 0 0 1-2.5-6z" fill="#B8164C"/>' +
    '</g></symbol>' +

    /* --- painted icons, same palette --- */
    /* Millie's real bag: folded white paper bag closed with a wooden clothespin */
    '<symbol id="d-bag" viewBox="0 0 64 64">' +
      '<path d="M17 22h30l1 37c0 1-1 2-2 2H18c-1 0-2-1-2-2z" fill="' + W + '" stroke="#E2DDD0" stroke-width="2.5" stroke-linejoin="round"/>' +
      '<path d="M20.5 25v33M43.5 25v33M17 51h31" stroke="#ECE8DE" stroke-width="1.3" stroke-linecap="round"/>' +
      '<path d="M16.5 16h31v6.5h-31z" fill="#F6F3EC" stroke="#E2DDD0" stroke-width="2.2" stroke-linejoin="round"/>' +
      '<text x="32" y="40" text-anchor="middle" font-family="Georgia, \'Times New Roman\', serif" font-weight="700" font-size="8.4" textLength="25" lengthAdjust="spacingAndGlyphs" fill="' + RD + '">Millie\u2019s</text>' +
      '<rect x="29.35" y="5.5" width="5.3" height="22.5" rx="1.2" fill="#E8CFA0" stroke="#C9A86E" stroke-width="1.3"/>' +
      '<path d="M32 6.5v20.5" stroke="#C9A86E" stroke-width=".85"/>' +
      '<rect x="28.35" y="13.5" width="7.3" height="2.7" rx=".9" fill="#A7A9AC"/>' +
    '</symbol>' +

    '<symbol id="d-balloon" viewBox="0 0 64 64">' +
      '<path d="M32 47c4 4-4 7 0 14" fill="none" stroke="' + BR + '" stroke-width="2" stroke-linecap="round"/>' +
      '<path d="M32 5c-11 0-17 9-17 18 0 11 9 19 17 21 8-2 17-10 17-21 0-9-6-18-17-18z" fill="' + RD + '"/>' +
      '<path d="M29 44h6l-3 4z" fill="' + RD + '"/>' +
      '<path d="M22 18c1-4 4-6 7-7" fill="none" stroke="' + W + '" stroke-width="2.6" stroke-linecap="round" opacity=".85"/>' +
    '</symbol>' +

    '<symbol id="d-heart" viewBox="0 0 64 64">' +
      '<path d="M32 55C11 40 7 24 18 17c7-4 12 0 14 6 2-6 7-10 14-6 11 7 7 23-14 38z" fill="' + PK + '"/>' +
      '<path d="M18 26c0-3 2-5 5-5" fill="none" stroke="' + W + '" stroke-width="2.6" stroke-linecap="round" opacity=".85"/>' +
    '</symbol>' +

    '<symbol id="d-cake" viewBox="0 0 64 64">' +
      '<rect x="20" y="20" width="3.5" height="12" rx="1.5" fill="' + BL + '"/><rect x="30.25" y="20" width="3.5" height="12" rx="1.5" fill="' + BL + '"/><rect x="40.5" y="20" width="3.5" height="12" rx="1.5" fill="' + BL + '"/>' +
      '<ellipse cx="21.75" cy="16" rx="2" ry="3" fill="' + RD + '"/><ellipse cx="32" cy="16" rx="2" ry="3" fill="' + RD + '"/><ellipse cx="42.25" cy="16" rx="2" ry="3" fill="' + RD + '"/>' +
      '<rect x="10" y="32" width="44" height="24" rx="3" fill="' + PK + '"/>' +
      '<path d="M10 35c0-2 1-3 3-3h38c2 0 3 1 3 3v6c-5 4-10 4-14 0-4 4-10 4-14 0-4 4-10 4-16 0z" fill="' + Y + '"/>' +
    '</symbol>' +

    '<symbol id="d-ring-gem" viewBox="0 0 64 64">' +
      '<circle cx="32" cy="41" r="14" fill="none" stroke="' + Y + '" stroke-width="5"/>' +
      '<path d="M24 19l8-10 8 10-8 10z" fill="' + BL + '"/>' +
      '<path d="M29 15l3-3" stroke="' + W + '" stroke-width="2" stroke-linecap="round"/>' +
    '</symbol>' +

    '<symbol id="d-cup" viewBox="0 0 64 64">' +
      '<path d="M32 34v18M22 55h20" fill="none" stroke="' + BR + '" stroke-width="3" stroke-linecap="round"/>' +
      '<path d="M19 8h26c0 15-5 24-13 26-8-2-13-11-13-26z" fill="' + LI + '"/>' +
      sugar([[27, 16], [36, 20], [31, 26]]) +
    '</symbol>' +

    '<symbol id="d-star" viewBox="0 0 64 64">' +
      '<path d="M32 6l7.5 16 17.5 2-13 12 3.5 18L32 45l-15.5 9L20 36 7 24l17.5-2z" fill="' + Y + '"/>' +
      sugar([[28, 24], [36, 32], [26, 38]]) +
    '</symbol>' +

    '<symbol id="d-camera" viewBox="0 0 64 64">' +
      '<path d="M8 22h12l4-7h16l4 7h12v30H8z" fill="' + TE + '"/>' +
      '<circle cx="32" cy="36" r="10" fill="' + CR + '"/><circle cx="32" cy="36" r="4.5" fill="' + BR + '"/>' +
    '</symbol>' +
    '</svg>';

  function inject() {
    var holder = document.createElement('div');
    holder.innerHTML = sprite;
    document.body.insertBefore(holder.firstChild, document.body.firstChild);
  }

  if (document.body) inject();
  else document.addEventListener('DOMContentLoaded', inject);
})();
