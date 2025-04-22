function laskeVertausluvut(lista) {
    const yhteensaAanet = lista.reduce((summa, e) => summa + e.aanet, 0);
  
    const ryhmat = lista.reduce((acc, ehdokas) => {
      const avain = ehdokas.aanet;
      if (!acc[avain]) acc[avain] = [];
      acc[avain].push(ehdokas);
      return acc;
    }, {});
  
    let arvottuLista = [];
    for (const aanet in ryhmat) {
      const ryhma = ryhmat[aanet];
      if (ryhma.length > 1) {
        
        ryhma.forEach(e => e.arvottu = true);
        for (let i = ryhma.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [ryhma[i], ryhma[j]] = [ryhma[j], ryhma[i]];
        }
      }
      arvottuLista.push(...ryhma);
    }
  
    arvottuLista.sort((a, b) => b.aanet - a.aanet);
  
    return arvottuLista.map((ehdokas, i) => {
      return {
        ...ehdokas,
        vertausluku: Math.floor(yhteensaAanet / (i + 1))
      };
    });
  }
  
  export default laskeVertausluvut;
  