function makeFileDiff(){var e=$("#file1").val(),i=$("#file2").val();null!=e&&null!=i&&e.trim().length>0&&i.trim().length>0&&(base=difflib.stringAsLines(e),newtxt=difflib.stringAsLines(i),sm=new difflib.SequenceMatcher(base,newtxt),opcodes=sm.get_opcodes(),diffoutputdiv=document.getElementById("showDiff"),diffoutputdiv.innerHTML="",diffoutputdiv.appendChild(diffview.buildView({baseTextLines:base,newTextLines:newtxt,opcodes:opcodes,baseTextName:fileName1,newTextName:fileName2,contextSize:null,viewType:0})),$(".diffinfo").show(),showOnlyDiff())}function showOnlyDiff(){$("#showonlydiff").is(":checked")?$(".diff tbody tr td.equal").parent().hide():$(".diff tbody tr td.equal").parent().show()}