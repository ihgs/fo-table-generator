import $ from 'jquery';
import "./less/main.less"
import { ViewTable }from "./js/display.js"


$(function(){
  const vt = new ViewTable();
  vt.render();
  $('#id_count_row').on('change',()=>{
    vt.render();
  });
  $('#id_count_column').on('change',()=>{
    vt.render();
  });
  $('#id_connect').on('click', ()=>{
    vt.addConnectedRange();
    vt.render();
  });
})