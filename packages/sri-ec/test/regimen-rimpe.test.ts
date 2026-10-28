import { describe, expect, it } from 'vitest';

import { LEYENDA_RIMPE, RegimenRimpe, TipoComprobante } from '../src/catalogs/index.js';
import { schemaFor, zodIssuesToErrors } from '../src/schemas/index.js';
import { facturaFixture } from './documents.test.js';

/**
 * Ficha Técnica del SRI, "Consideraciones generales para el contribuyente
 * RIMPE": el emisor declara su régimen en `infoTributaria/contribuyenteRimpe`
 * con uno de DOS textos literales — 27 caracteres para RIMPE general
 * (emprendedor) y 45 para negocio popular. El consumidor de la librería NO
 * escribe esa leyenda: declara el régimen y `sri-ec` la escribe.
 *
 * Mismo helper `"path: mensaje"` que `schemas.test.ts`.
 */
function errorsFor(tipo: TipoComprobante, data: unknown): string[] {
  const result = schemaFor(tipo).safeParse(data);
  return result.success ? [] : zodIssuesToErrors(result.error.issues);
}

describe('RegimenRimpe — leyenda del régimen en infoTributaria', () => {
  it('mapea los dos regímenes al texto literal exacto que exige el SRI, con su longitud', () => {
    expect(LEYENDA_RIMPE[RegimenRimpe.General]).toBe('CONTRIBUYENTE RÉGIMEN RIMPE');
    expect(LEYENDA_RIMPE[RegimenRimpe.General]).toHaveLength(27);

    expect(LEYENDA_RIMPE[RegimenRimpe.NegocioPopular]).toBe('CONTRIBUYENTE NEGOCIO POPULAR - RÉGIMEN RIMPE');
    expect(LEYENDA_RIMPE[RegimenRimpe.NegocioPopular]).toHaveLength(45);
  });

  it('acepta cualquiera de los dos regímenes en infoTributaria.regimenRimpe', () => {
    for (const regimen of [RegimenRimpe.General, RegimenRimpe.NegocioPopular]) {
      const result = schemaFor(TipoComprobante.Factura).safeParse({
        ...facturaFixture,
        infoTributaria: { ...facturaFixture.infoTributaria, regimenRimpe: regimen },
      });
      expect(result.success, `rechazó el régimen ${regimen}`).toBe(true);
    }
  });

  it('rechaza la leyenda completa como valor: el consumidor declara el régimen, no el texto', () => {
    const errors = errorsFor(TipoComprobante.Factura, {
      ...facturaFixture,
      infoTributaria: {
        ...facturaFixture.infoTributaria,
        regimenRimpe: 'CONTRIBUYENTE RÉGIMEN RIMPE',
      },
    });
    expect(errors.some((e) => e.startsWith('infoTributaria.regimenRimpe:'))).toBe(true);
  });

  it('rechaza el campo legado infoTributaria.contribuyenteRimpe (texto libre)', () => {
    const errors = errorsFor(TipoComprobante.Factura, {
      ...facturaFixture,
      infoTributaria: {
        ...facturaFixture.infoTributaria,
        contribuyenteRimpe: 'CONTRIBUYENTE RÉGIMEN RIMPE',
      },
    });
    expect(errors.some((e) => e.includes('contribuyenteRimpe'))).toBe(true);
  });
});
