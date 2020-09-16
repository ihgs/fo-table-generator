import $ from 'jquery';

var onSelect =false;
var selected = {};
export class ViewTable {

  constructor(){
    this.connectedRange = [];
  }

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
    this.cells = [];
  }

  addConnectedRange(){
    this.connectedRange.push(
      this.selected
    )
  }

  connected() {
    return this.connectedRange;
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
          this.cells.push(cell);
          cell.on('click', ()=>{
            if(onSelect){
              if(i<selected['sR']){
                selected['eR'] = selected['sR'];
                selected['sR'] = i;
              }else {
                selected['eR'] = i;
              }
              if(j<selected['sC']){
                selected['eC'] = selected['sC'];
                selected['sC'] = j;
              }else {
                selected['eC'] = j;
              }
              this.cells.forEach(target=>{
                const _r = target.attr('r');
                const _c = target.attr('c');
                  
                if(selected.sC<=_c && _c <=selected.eC
                  && selected.sR <= _r && _r <=selected.eR){
                  
                  target.removeClass('onSelect');
                  target.addClass('selected');
                } else {
                  target.removeClass('selected');
                }
              })
              
              onSelect = false;
            }else {
              onSelect = true;
              selected = {
                sR:i,
                sC:j
              };
              this.cells.forEach(target=>{
                target.removeClass('selected');
              })
              cell.addClass('onSelect');

            }
            this.selected = selected;
          });
          cell.on('mouseover', ()=>{
            if(onSelect){
              const myR = cell.attr('r');
              const myC = cell.attr('c');
              const minR = Math.min(myR, selected.sR);
              const minC = Math.min(myC, selected.sC);
              const maxR = Math.max(myR, selected.sR);
              const maxC = Math.max(myC, selected.sC);
              this.cells.forEach(target=>{
                const _r = target.attr('r');
                const _c = target.attr('c');
                if(minR<=_r && _r<=maxR && minC<= _c && _c <= maxC){
                  target.addClass('onSelect');
                }else{
                  target.removeClass('onSelect');
                }
              })
            }
          });
          
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

