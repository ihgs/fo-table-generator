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
  $('#id_disconnect').on('click', ()=>{
    vt.removeConnectedRange();
    vt.render();
  });

  $('#id_set_label').on('click',()=>{
    vt.setLabel();
    vt.render();
  })

  $('#id_copy_fop_button').on('click', ()=>{
    $('#id_fo_contents').select();
    document.execCommand("copy");
    alert('コピーしました');
  });
})