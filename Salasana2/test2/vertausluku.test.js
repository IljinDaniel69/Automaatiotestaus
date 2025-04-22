import laskeVertausluvut from "../vertausluku.js";
import ehdokasRekisteri from "./ehdokasRekisteri.js";

import { afterEach, beforeEach, describe, it, mock } from "node:test";
import assert from "node:assert/strict";

describe("laskeVertausluvut", () => {
  beforeEach(() => {
    const lista = [
      { numero: 101, nimi: "Maija Meikäläinen", aanet: 2 },
      { numero: 102, nimi: "Kalle Korhonen", aanet: 4 },
      { numero: 103, nimi: "Sari Virtanen", aanet: 2 },
      { numero: 104, nimi: "Jukka Jokinen", aanet: 5 },
    ];

    // Luo mock-metodi ja tallenna viittaus
    mock.method(ehdokasRekisteri, "haeLista", () => {
      return lista;
    });
  });

  afterEach(() => {
    mock.reset();
  });

  it('asettaa kentän "arvottu: true" niille, joilla on sama äänimäärä', () => {
    const tulos = laskeVertausluvut(ehdokasRekisteri.haeLista());
    const arvotut = tulos.filter((e) => e.aanet === 2);
    assert.ok(arvotut.length === 2);
    arvotut.forEach((e) => assert.strictEqual(e.arvottu, true));
  });

  it("arpoo saman äänimäärän ehdokkaiden järjestyksen", () => {
    const eka = laskeVertausluvut(ehdokasRekisteri.haeLista());
    const toka = laskeVertausluvut(ehdokasRekisteri.haeLista());

    const ekaJarjestys = eka
      .filter((e) => e.aanet === 2)
      .map((e) => e.numero)
      .join(",");

    const tokaJarjestys = toka
      .filter((e) => e.aanet === 2)
      .map((e) => e.numero)
      .join(",");

    let vaihtoTapahtui = false;
    for (let i = 0; i < 10; i++) {
      const uusi = laskeVertausluvut(ehdokasRekisteri.haeLista());
      const uusiJarjestys = uusi
        .filter((e) => e.aanet === 2)
        .map((e) => e.numero)
        .join(",");

      if (uusiJarjestys !== ekaJarjestys) {
        vaihtoTapahtui = true;
        break;
      }
    }

    assert.ok(
      vaihtoTapahtui,
      "Saman äänimäärän järjestys ei vaihdu, vaikka pitäisi"
    );
  });
});
