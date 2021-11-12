var editorAce, editorResult, viewname, converted = "";

function jsonTocsv() {
    jsonTocsvbyjson(editorAce.getValue())
}

function jsontoUrlEncode() {
    var e = editorAce.getValue();
    editorResult.setValue(encodeURIComponent(e))
}

function defaultAction() {}

function json2xmlConvert(e) {
    try {
        editorResult.getSession().setMode("ace/mode/xml");
        var t = editorAce.getValue();
        if (null != e ? t = e : setOutputMsg("JSON TO XML"), t.trim().length > 0) {
            var r, o = (new XML.ObjTree).writeXML(JSON.parse(t));
            o = decodeSpecialCharacter(o);
            try {
                r = $.parseXML(o)
            } catch (e) {
                r = !1
            }
            0 == r && (o = o.substr(0, 39) + "<root>" + o.substr(39) + "</root>"), editorResult.setValue(vkbeautify.xml(o))
        }
    } catch (e) {
        editorResult.setValue("Error in data")
    }
}
$(document).ready((function() {
    "json-to-csv" == (viewname = $("#viewName").val().trim()) ? (setViewTitle("JSON TO CSV Converter", !0, !0), createEditor("json", "text")) : "jsontoxml" == viewname ? (setViewTitle("JSON TO XML Converter", !0, !0), createEditor("json", "xml")) : "json-to-yaml" == viewname ? (setViewTitle("JSON TO YAML Converter", !0, !0), createEditor("json", "yaml")) : "jsonvalidate" == viewname ? (createEditor("json"), setViewTitle("JSON Validator", !0, !0)) : "tsv-to-json-converter" == viewname ? (createEditor("text", "json"), setViewTitle("Online TSV TO JSON Converter", !0, !0)) : "json-to-tsv-converter" == viewname ? (createEditor("json", "text"), setViewTitle("Online JSON TO TSV Converter", !0, !0)) : "tsv-to-xml-converter" == viewname ? (createEditor("text", "xml"), setViewTitle("Online TSV TO XML Converter", !0, !0)) : "xml-to-tsv-converter" == viewname ? (createEditor("xml", "text"), setViewTitle("Online XML TO TSV Converter", !0, !0)) : "json-to-excel-converter" == viewname ? (createEditor("json"), setViewTitle("Online JSON TO EXCEL Converter", !0, !0)) : "json-to-java-converter" == viewname ? (createEditor("json", "java"), setViewTitle("Online JSON TO JAVA Converter", !0, !0)) : ("json-to-base64-converter" == viewname || "json-to-url-encode" == viewname) && (setViewTitle("JSON TO BASE64 Converter", !0, !0), createEditor("json", "text"))
}));
var Base64 = {
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    encode: function(e) {
        var t, r, o, n, a, i, s, c = "",
            l = 0;
        for (e = Base64._utf8_encode(e); l < e.length;) n = (t = e.charCodeAt(l++)) >> 2, a = (3 & t) << 4 | (r = e.charCodeAt(l++)) >> 4, i = (15 & r) << 2 | (o = e.charCodeAt(l++)) >> 6, s = 63 & o, isNaN(r) ? i = s = 64 : isNaN(o) && (s = 64), c = c + this._keyStr.charAt(n) + this._keyStr.charAt(a) + this._keyStr.charAt(i) + this._keyStr.charAt(s);
        return c
    },
    decode: function(e) {
        var t, r, o, n, a, i, s = "",
            c = 0;
        for (e = e.replace(/[^A-Za-z0-9\+\/\=]/g, ""); c < e.length;) t = this._keyStr.indexOf(e.charAt(c++)) << 2 | (n = this._keyStr.indexOf(e.charAt(c++))) >> 4, r = (15 & n) << 4 | (a = this._keyStr.indexOf(e.charAt(c++))) >> 2, o = (3 & a) << 6 | (i = this._keyStr.indexOf(e.charAt(c++))), s += String.fromCharCode(t), 64 != a && (s += String.fromCharCode(r)), 64 != i && (s += String.fromCharCode(o));
        return s = Base64._utf8_decode(s)
    },
    _utf8_encode: function(e) {
        e = e.replace(/\r\n/g, "\n");
        for (var t = "", r = 0; r < e.length; r++) {
            var o = e.charCodeAt(r);
            o < 128 ? t += String.fromCharCode(o) : o > 127 && o < 2048 ? (t += String.fromCharCode(o >> 6 | 192), t += String.fromCharCode(63 & o | 128)) : (t += String.fromCharCode(o >> 12 | 224), t += String.fromCharCode(o >> 6 & 63 | 128), t += String.fromCharCode(63 & o | 128))
        }
        return t
    },
    _utf8_decode: function(e) {
        for (var t = "", r = 0, o = c1 = c2 = 0; r < e.length;)(o = e.charCodeAt(r)) < 128 ? (t += String.fromCharCode(o), r++) : o > 191 && o < 224 ? (c2 = e.charCodeAt(r + 1), t += String.fromCharCode((31 & o) << 6 | 63 & c2), r += 2) : (c2 = e.charCodeAt(r + 1), c3 = e.charCodeAt(r + 2), t += String.fromCharCode((15 & o) << 12 | (63 & c2) << 6 | 63 & c3), r += 3);
        return t
    }
};

function json2base64Convert() {
    var e = editorAce.getValue();
    editorResult.setValue(Base64.encode(e))
}

function JsonToYAML() {
    editorResult.getSession().setMode("ace/mode/yaml");
    var e = editorAce.getValue();
    if (e.trim().length > 0) try {
        data = json2yaml(e.trim()), editorResult.setValue(data), setOutputMsg("JSON TO YAML")
    } catch (e) {
        var t = "";
        t = t + "Error : " + e.message, t = (t += "\n") + "Line : " + e.parsedLine + "  " + e.snippet, editorResult.setValue(t), setOutputMsg("Invalid JSON")
    }
}

function validate(e) {
    return null == e || null == e || "" == e ? "" : e
}

function clearJSON() {
    editorAce.setValue(""), $("#hResult").hide()
}

function downloadJSONFile() {
    if (editorAce.getValue().trim().length > 0) {
        var e = new Blob(["" + editorAce.getValue()], {
            type: "text/plain;charset=utf-8"
        });
        "validate" != converted ? fileDownloadCB(e, "codebeautify.json") : openErrorDialog("Yaml is not converted to JSON / XML ")
    } else openErrorDialog("Sorry Result is Empty")
}

function convertJsonToJava() {
    var e = editorAce.getValue();
    createJavaObject(e)
}

function setToEditor(e) {
    editorAce.setValue(vkbeautify.json(e)), "json-to-csv" == viewname ? jsonTocsv() : "jsontoxml" == viewname ? json2xmlConvert() : "json-to-yaml" == viewname ? JsonToYAML() : "jsonvalidate" == viewname ? validateJSON() : "json-to-java-converter" == viewname && convertJsonToJava()
}