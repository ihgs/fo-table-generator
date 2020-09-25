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

  $('#id_copy_conf_button').on('click', ()=>{
    $('#id_conf').select();
    document.execCommand("copy");
    alert('コピーしました');
  });

  $('#id_load_conf_button').on('click',()=>{
    vt.loadConf();
    vt.render();
  })

  $('#id_border').on('click',()=>{
    vt.setBorder('normalBorder');
    vt.render();
  })

  $('#id_thick_border').on('click',()=>{
    vt.setBorder('thickBorder');
    vt.render();
  })

  
})