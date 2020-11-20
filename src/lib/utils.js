/**
 * Create an element with attributes and events, and append elements or
 * strings to it.
 *
 * Usage:
 *  const el = element(
 *    'button',
 *    { 'class': 'button' },
 *    { click: () => { ... } },
 *    'Takki'
 *   );
 *  returns
 *  <button class="button">Takki</button> with a click handler.
 *
 * @param {string} name Element name
 * @param {object} attributes Object containing attributes to attach to element.
 * @param {object} events Object of events to add to element.
 * @param  {...any} children List of elements or strings to append to element.
 * @returns {object} HTML element.
 */
/* eslint-disable*/ //Disable-um því við fengum fallið frá Óla og viljum ekki fikta í því
export function element(name, attributes = null, events = null, ...children) {

  const elem = document.createElement(name);

  for (const child of children) {
    if (!child) {
      continue;
    }

    if (attributes) {
      for (const attrib in attributes) {
        elem.setAttribute(attrib, attributes[attrib]);
      }
    }

    if (events) {
      for (const event in events) {
        elem.addEventListener(event, events[event]);
      }
    }

    if (typeof child === 'string') {
      elem.appendChild(document.createTextNode(child));
    } else {
      elem.appendChild(child);
    }
  }

  return elem;
}
/* eslint-enable */

/**
 * Simplified element function.
 * Creates an element and append elements or strings to it.
 *
 * @param {string} name Element name
 * @param  {...any} children List of elements or strings to append to element.
 * @returns {object} HTML element.
 */
export function el(name, ...children) {
  return element(name, null, null, ...children);
}

/**
 * Format a timestamp as dd.mm.yyyy hh:mm:ss e.g. "01.11.2020 12:00:00".
 *
 * @param {number} timestamp Unix timestamp to format
 * @returns {string} Formatted string.
 */
export function formatTime(milliseconds) {
  const time = Date.now() - milliseconds;
  const sek = Math.floor(time / 1000);
  const hour = Math.floor(sek / 3600);
  if (hour === 1) return 'Fyrir 1 klukkustund síðan';
  if (hour <= 24) return `Fyrir ${hour} klukkustundum síðan`;
  const day = Math.floor(hour / 24);
  if (day === 1) return 'Fyrir 1 degi síðan';
  if (day <= 7) return `Fyrir ${day} dögum síðan`;
  const week = Math.floor(day / 7);
  if (week === 1) return 'Fyrir 1 viku síðan';
  if (week <= 4) return `Fyrir ${week} vikum síðan`;
  const month = Math.floor(day / 30);
  if (month === 1) return 'Fyrir 1 mánuði síðan';
  if (month <= 11) return `Fyrir ${month} mánuðum síðan`;
  const year = Math.floor(month / 12);
  if (year === 1) return 'Fyrir 1 ári síðan';
  return `Fyrir ${year} árum síðan`;
}
