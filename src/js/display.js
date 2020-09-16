import $ from 'jquery';
import format from 'xml-formatter';

var onSelect =false;
var selected = {};
export class ViewTable {

  constructor(){
    this.conf = {};
    this.conf.connectedRange = [];
    this.conf.labelData = {};
  }

  load() {
    const countRow = $('#id_count_row').val();
    const countColumn = $('#id_count_column').val();
    const pageWidth = $('#id_page_width').val();
    let cr = parseInt(countRow);
    let cc = parseInt(countColumn);
    if (cr === NaN || cr < 2) {
      cr = 3;
    }
    if (cc === NaN || cc < 2) {
      cc = 3;
    }
    this.conf.countRow = cr;
    this.conf.countColumn = cc;
    this.cells = [];
    this.conf.pageWidth = pageWidth;
  }

  addConnectedRange(){
    this.conf.connectedRange.push(
      this.selected
    )
    this.selected = {};
  }

  removeConnectedRange(){
    for(let i = 0;i<this.conf.connectedRange.length;i++){
      if(this.selected.sR === this.conf.connectedRange[i].sR 
        && this.selected.sC === this.conf.connectedRange[i].sC){
          this.conf.connectedRange.splice(i, 1);
          break;
        }
    }
    this.selected ={};
  }

  selectedKey (){
    if(this.selected.sR !== undefined){
      return String(this.selected.sR) + '_' + String(this.selected.sC); 
    }
    return null;
  }

  setLabel(){
    const key = this.selectedKey();
    if(key){
      const inputTxt = $('#id_label_txt').val();
      this.conf.labelData[key] = inputTxt;
    }
  }

  getLabel(r,c){
    const key = String(r) + '_' + String(c);
    if(this.conf.labelData[key]!==undefined || this.conf.labelData[key]!==null){
      return this.conf.labelData[key];
    }
    return '';
  }

  connected() {
    return this.conf.connectedRange;
  }

  render() {
    this.load();

    const table = $('<table>');
    const tbody = $('<tbody>');
    table.append(tbody);
    const fo_root = $('<root>');
    const fo_table = $('<fo:table>');
    fo_root.append(fo_table);
    const cWidth = this.conf.pageWidth / this.conf.countColumn;
    for(let i=0;i<this.conf.countColumn;i++){
      const fo_table_column = $('<fo:table-column>')
      fo_table_column.attr('column-number', i+1);
      fo_table_column.attr('column-width', String(cWidth) + 'mm');
      fo_table.append(fo_table_column);
    }
    const fo_tbody = $('<fo:table-body>');
    fo_table.append(fo_tbody);

    const cons = this.connected();
    for (let i = 0; i < this.conf.countRow; i++) {
      const row = $('<tr>');
      row.attr('r', i);
      tbody.append(row);
      const fo_row = $('<fo:table-row>');
      fo_tbody.append(fo_row);

      for (let j = 0; j < this.conf.countColumn; j++) {
        const label = this.getLabel(i,j);
        const cell = $('<td>');
        cell.text(label);
        const fo_cell = $('<fo:table-cell>');
        fo_cell.attr('xsl:use-attribute-sets', 'myTableCellStyle');
        const fo_cell_comment = $('<xsl:comment>');
        fo_cell_comment.text('Row:'+i+', Column:'+j);
        fo_cell.append(fo_cell_comment);
        const fo_cell_block = $('<fo:block>');
        fo_cell_block.text(label);
        fo_cell.append(fo_cell_block);
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
            fo_cell.attr('number-rows-spanned', diffR+1);
            fo_cell.attr('number-columns-spanned', diffC+1);
            isConnected = true;
          } else if (con.sR <= i && i <= con.eR && con.sC <= j && j <= con.eC) {
            skip = true;
            isConnected = true;
          }
        })
        if (!skip) {
          row.append(cell);
          fo_row.append(fo_cell);
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
    $('#id_fo_contents').val(format(fo_root.html()));
    this.setConf();
  }

  setConf(){

    $('#id_conf').val(JSON.stringify(this.conf));
    
  }

  loadConf(){
    const conf = JSON.parse($('#id_conf').val());
    $('#id_count_column').val(conf.countColumn);
    $('#id_count_row').val(conf.countRow);
    $('#id_page_width').val(conf.pageWidth);
    
    this.conf = conf;
  }
}

