const { composeContent } = require("./contents");

async function composeMaket_New(coreData,appData) {
    // надо построить МАКЕТ одной новости
    // по взятому нами определению термина "МАКЕТ", 
    // мы точно знаем, из каких визуальных частей свёрстан этот макет и точно знаем, "КОНТЕНТ" с каким идентификатором в каждой визуальной части надо отобразить
    // функция должна вернуть HTML-код, пригодный для отправки клиенту

    let html="";

    html+=`<html lang="ru">\n`;
    html+=`<head>\n`;
    if ( appData.newInfo.metakeywords )
        html+=`<meta name="keywords" content="${appData.newInfo.metakeywords}"/>\n`;
    if ( appData.newInfo.metadescription )
        html+=`<meta name="description" content="${appData.newInfo.metadescription}"/>\n`;
    html+=`<title>Новость - ${appData.newInfo.header}</title>\n`;
    html+=`</head>\n`;

    // скомпонуем HTML-код для каждой визуальной части сайта, построив соответствующий контент
    let headContentHTMLs=await composeContent(22,coreData,appData); // мы точно знаем, что в макете одной новости в шапке - всегда контент 22
    let bannersContentHTMLs=await composeContent(11,coreData,appData); // в макете одной новости в баннерах - всегда контент 11
    let bottomContentHTMLs=await composeContent(33,coreData,appData); // в макете одной новости в подвале - всегда контент 33
    let urlNewContentHTMLs=await composeContent(44,coreData,appData); // в макете одной новости в "новости из УРЛа" - всегда контент 44

    html+=`<table border=1 cellpadding=5 style='width: 100%; border-collapse: collapse'>\n`;
    html+=`<tr><td colspan=2><i>ШАПКА</i><br>${headContentHTMLs.join("\n")}</td></tr>\n`;
    html+=`<tr>\n`;
    html+=`<td valign=top style='width: 300px'><i>РЕКЛАМА</i><br>${bannersContentHTMLs.join("\n")}</td>\n`;
    html+=`<td valign=top><i>НОВОСТЬ ИЗ УРЛА</i><br>${urlNewContentHTMLs.join("\n")}</td>\n`;
    html+=`</tr>\n`;
    html+=`<tr><td colspan=2><i>ПОДВАЛ</i><br>${bottomContentHTMLs.join("\n")}</td></tr>\n`;
    html+=`</table>\n`;

    html+=`</html>\n`;

    return html;
}

module.exports={
    composeMaket_New,
};
