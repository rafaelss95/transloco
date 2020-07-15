(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{104:function(n,e,t){"use strict";t.r(e),t.d(e,"frontMatter",(function(){return i})),t.d(e,"metadata",(function(){return l})),t.d(e,"rightToc",(function(){return s})),t.d(e,"default",(function(){return u}));var r=t(2),a=t(6),o=(t(0),t(146)),i={title:"Generate Locale Files using Google Translate"},l={id:"recipes/generateLocaleFileUsingGoogleTranslate",isDocsHomePage:!1,title:"Generate Locale Files using Google Translate",description:"Many thanks to born2net for sharing this. (#261)",source:"@site/docs/recipes/generateLocaleFileUsingGoogleTranslate.mdx",permalink:"/transloco/docs/recipes/generateLocaleFileUsingGoogleTranslate",editUrl:"https://github.com/ngneat/transloco/edit/master/docs/docs/recipes/generateLocaleFileUsingGoogleTranslate.mdx",sidebar:"docs",previous:{title:"Using xliff",permalink:"/transloco/docs/recipes/xliff"}},s=[{value:"Steps",id:"steps",children:[]},{value:"Expected output:",id:"expected-output",children:[]}],c={rightToc:s};function u(n){var e=n.components,t=Object(a.a)(n,["components"]);return Object(o.b)("wrapper",Object(r.a)({},c,t,{components:e,mdxType:"MDXLayout"}),Object(o.b)("p",null,"Many thanks to ",Object(o.b)("a",Object(r.a)({parentName:"p"},{href:"https://github.com/born2net"}),"born2net")," for sharing this. ",Object(o.b)("a",Object(r.a)({parentName:"p"},{href:"https://github.com/ngneat/transloco/issues/261"}),"(#261)")),Object(o.b)("p",null,"The script will  read the en.json translation file and will generate new localized files based on what's defined in the script."),Object(o.b)("h2",{id:"steps"},"Steps"),Object(o.b)("ol",null,Object(o.b)("li",{parentName:"ol"},"Uncomment createLocalFiles() one time to create all the files: he.json, ca.json etc..."),Object(o.b)("li",{parentName:"ol"},"Comment/Delete createLocalFiles() as you no longer need it"),Object(o.b)("li",{parentName:"ol"},"Provide your google key via process.env.GOOGLE_KEY"),Object(o.b)("li",{parentName:"ol"},"Run the script to populate the translations, re-run it whenever you make changes to your en.json")),Object(o.b)("blockquote",null,Object(o.b)("p",{parentName:"blockquote"},"Note: this script requires google-translate")),Object(o.b)("pre",null,Object(o.b)("code",Object(r.a)({parentName:"pre"},{className:"language-javascript"}),"\n#!/usr/bin/env node\nconst fs = require('fs');\nconst googleTranslate = require('google-translate')(process.env.GOOGLE_KEY);\nconst i18Dir = './src/assets/i18n';\nconst defaultSourceLang = 'en';\nconst codes = {\n    Afrikaans: 'af',\n    Irish: 'ga',\n    Albanian: 'sq',\n    Italian: 'it',\n    Arabic: 'ar',\n    Japanese: 'ja',\n    Azerbaijani: 'az',\n    Kannada: 'kn',\n    Basque: 'eu',\n    Korean: 'ko',\n    Bengali: 'bn',\n    Latin: 'la',\n    Belarusian: 'be',\n    Latvian: 'lv',\n    Bulgarian: 'bg',\n    Lithuanian: 'lt',\n    Catalan: 'ca',\n    Macedonian: 'mk',\n    ChineseSimplified: 'zh-CN',\n    Malay: 'ms',\n    ChineseTraditional: 'zh-TW',\n    Maltese: 'mt',\n    Croatian: 'hr',\n    Norwegian: 'no',\n    Czech: 'cs',\n    Persian: 'fa',\n    Danish: 'da',\n    Polish: 'pl',\n    Dutch: 'nl',\n    Portuguese: 'pt',\n    English: 'en',\n    Romanian: 'ro',\n    Esperanto: 'eo',\n    Russian: 'ru',\n    Estonian: 'et',\n    Serbian: 'sr',\n    Filipino: 'tl',\n    Slovak: 'sk',\n    Finnish: 'fi',\n    Slovenian: 'sl',\n    French: 'fr',\n    Spanish: 'es',\n    Galician: 'gl',\n    Swahili: 'sw',\n    Georgian: 'ka',\n    Swedish: 'sv',\n    German: 'de',\n    Tamil: 'ta',\n    Greek: 'el',\n    Telugu: 'te',\n    Gujarati: 'gu',\n    Thai: 'th',\n    Haitian: 'ht',\n    Turkish: 'tr',\n    Hebrew: 'he',\n    Ukrainian: 'uk',\n    Hindi: 'hi',\n    Urdu: 'ur',\n    Hungarian: 'hu',\n    Vietnamese: 'vi',\n    Icelandic: 'is',\n    Welsh: 'cy',\n    Indonesian: 'id',\n    Yiddish: 'yi'\n};\n\nlet createLocalFiles = () => {\n    Object.values(codes).forEach((local) => {\n        if (local === defaultSourceLang) return;\n        const p = `./src/assets/i18n/${local}.json`;\n        if (fs.existsSync(p)) {\n            console.log('exists ' + p);\n        } else {\n            fs.writeFileSync(p, '', {encoding: 'utf8', flag: 'w'});\n        }\n    });\n};\n\n// createLocalFiles();\n\nlet sourceFile = (local) => {\n    try {\n        return JSON.parse(fs.readFileSync(`./src/assets/i18n/${local}.json`, 'utf8'));\n    } catch (e) {\n        return null;\n    }\n\n};\n\nlet getLocals = () => {\n    return new Promise((resolve, reject) => {\n        const locals = [];\n        fs.readdir(i18Dir, (err, files) => {\n            files.forEach(file => {\n                if (file === `${defaultSourceLang}.json`) return;\n                file = file.replace(/\\.json/, '');\n                locals.push(file);\n            });\n            resolve(locals);\n        });\n    });\n};\n\nlet trasnlate = (word, local) => {\n    return new Promise((resolve, reject) => {\n        googleTranslate.translate(word, local, function (err, translation) {\n            if (translation === undefined) {\n                console.log('>> google error ' + err + ' ' + word + ' ' + local);\n            } else {\n                var translated = cleanProbCharactersV2(translation.translatedText);\n            }\n            resolve(translated);\n        });\n    });\n};\n\nconst cleanProbCharactersV2 = (i_string) => {\n    i_string = i_string.replace(/'/ig, \"\");\n    i_string = i_string.replace(/\"/ig, \"\");\n    i_string = i_string.replace(/}/ig, \"\");\n    i_string = i_string.replace(/{/ig, \"\");\n    i_string = i_string.replace(/\\)/ig, \"\");\n    i_string = i_string.replace(/\\r/ig, \"\");\n    i_string = i_string.replace(/\\n/ig, \"\");\n    i_string = i_string.replace(/()/ig, \"\");\n    return i_string;\n};\n\nconst localSource = sourceFile(defaultSourceLang);\n\n(async function asyncConnect() {\n    try {\n        const languages = await getLocals(3000);\n        for (let i = 0; i < languages.length; i++) {\n            let final = {};\n            const local = languages[i];\n            console.log('processing local ' + local + ' >>>');\n            const destlSource = sourceFile(local);\n            if (destlSource) {\n                final = destlSource;\n            }\n            for (section in localSource) {\n                if (!final[section])\n                    final[section] = {};\n                const words = localSource[section];\n                for (word in words) {\n                    if (destlSource && destlSource[section] && destlSource[section][word]) {\n                        final[section][word] = destlSource[section][word]\n                    } else {\n                        console.log('   >>> ' + section + ' ' + words[word]);\n                        const newWord = await trasnlate(words[word], local);\n                        console.log('       ### translated to ' + newWord);\n                        final[section][word] = newWord;\n                    }\n                }\n            }\n            const f = i18Dir + '/' + local + '.json';\n            try {\n                fs.writeFileSync(f, JSON.stringify(final, null, '\\t'), {encoding: 'utf8', flag: 'w'});\n            } catch (err) {\n                console.error(err);\n            }\n\n        }\n    } catch (err) {\n        console.log('problem encountered ' + err);\n        client.end()\n    }\n})();\n")),Object(o.b)("h2",{id:"expected-output"},"Expected output:"),Object(o.b)("img",{class:"gif",src:"../../img/translation-script-result.png"}))}u.isMDXComponent=!0},146:function(n,e,t){"use strict";t.d(e,"a",(function(){return p})),t.d(e,"b",(function(){return d}));var r=t(0),a=t.n(r);function o(n,e,t){return e in n?Object.defineProperty(n,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):n[e]=t,n}function i(n,e){var t=Object.keys(n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(n);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),t.push.apply(t,r)}return t}function l(n){for(var e=1;e<arguments.length;e++){var t=null!=arguments[e]?arguments[e]:{};e%2?i(Object(t),!0).forEach((function(e){o(n,e,t[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(e){Object.defineProperty(n,e,Object.getOwnPropertyDescriptor(t,e))}))}return n}function s(n,e){if(null==n)return{};var t,r,a=function(n,e){if(null==n)return{};var t,r,a={},o=Object.keys(n);for(r=0;r<o.length;r++)t=o[r],e.indexOf(t)>=0||(a[t]=n[t]);return a}(n,e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(n);for(r=0;r<o.length;r++)t=o[r],e.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(n,t)&&(a[t]=n[t])}return a}var c=a.a.createContext({}),u=function(n){var e=a.a.useContext(c),t=e;return n&&(t="function"==typeof n?n(e):l(l({},e),n)),t},p=function(n){var e=u(n.components);return a.a.createElement(c.Provider,{value:e},n.children)},g={inlineCode:"code",wrapper:function(n){var e=n.children;return a.a.createElement(a.a.Fragment,{},e)}},f=a.a.forwardRef((function(n,e){var t=n.components,r=n.mdxType,o=n.originalType,i=n.parentName,c=s(n,["components","mdxType","originalType","parentName"]),p=u(t),f=r,d=p["".concat(i,".").concat(f)]||p[f]||g[f]||o;return t?a.a.createElement(d,l(l({ref:e},c),{},{components:t})):a.a.createElement(d,l({ref:e},c))}));function d(n,e){var t=arguments,r=e&&e.mdxType;if("string"==typeof n||r){var o=t.length,i=new Array(o);i[0]=f;var l={};for(var s in e)hasOwnProperty.call(e,s)&&(l[s]=e[s]);l.originalType=n,l.mdxType="string"==typeof n?n:r,i[1]=l;for(var c=2;c<o;c++)i[c]=t[c];return a.a.createElement.apply(null,i)}return a.a.createElement.apply(null,t)}f.displayName="MDXCreateElement"}}]);