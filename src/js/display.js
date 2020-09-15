import $ from 'jquery';

export class ViewTable {

  load() {
    const countRow = $('#id_count_row').val();
    const countColumn = $('#id_count_column').val();
    let cr = parseInt(countRow);
    let cc = parseInt(countColumn);
    if (cr === NaN || cr < 2) {
      cr = 3;
    }
    if (cc === NaN || cc < 2) {
      cc = 3;
    }
    this.countRow = cr;
    this.countColumn = cc;
  }

  connected() {
    return [
      {
        sR: 0, sC: 0,
        eR: 1, eC: 0
      }
    ]
  }
  render() {
    this.load();

    const table = $('<table>');
    const tbody = $('<tbody>');
    table.append(tbody);
    const cons = this.connected();
    for (let i = 0; i < this.countRow; i++) {
      const row = $('<tr>');
      row.attr('r', i);
      tbody.append(row);

      for (let j = 0; j < this.countColumn; j++) {
        const cell = $('<td>');
        cell.attr('r', i);
        cell.attr('c', j);

        let skip = false;
        let isConnected = false;
        cons.forEach(con => {
          if (i === con.sR && j === con.sC) {
            const diffR = con.eR - con.sR;
            const diffC = con.eC - con.sC;
            cell.attr('rowSpan', diffR + 1);
            cell.attr('colSpan', diffC + 1);
            isConnected = true;
          } else if (con.sR <= i && i <= con.eR && con.sC <= j && j <= con.eC) {
            skip = true;
            isConnected = true;
          }
        })
        if (!skip) {
          row.append(cell);
        }
        if (isConnected) {
          cell.attr('connected', 1)
        }
      }
    }
    $("#id_canvas").empty();
    $("#id_canvas").append(table)
  }
}

