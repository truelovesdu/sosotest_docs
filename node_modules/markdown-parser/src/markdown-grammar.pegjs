/* 
GITHUB MARKDOWN EXTRACTOR RULES

https://guides.github.com/features/mastering-markdown/

http://www.table-ascii.com/

http://www.loc.gov/marc/specifications/specchartables.html

http://www.utf8-chartable.de/unicode-utf8-table.pl
*/

{
 var others = [];

 function extractList(list, index) {
    var headings = [], lists = [], sections= [], 
    italics = [], strikethroughs= [], bolds= [],
    lists = [], listsOrdered= [], tasks= [],
    references= [], codes= [], i;

    for (i = 0; i < list.length; i++) {
      if (list[i].heading)
       headings.push(list[i].heading);
      if (list[i].lists)
       lists.push(list[i].lists);
      if (list[i].section)
       sections.push(list[i].section);
      if (list[i].bold)
       bolds.push(list[i].bold);
      if (list[i].italic)
       italics.push(list[i].italic);
      if (list[i].strikethrough)
       strikethroughs.push(list[i].strikethrough);
      if (list[i].listsOrdered)
       listsOrdered.push(list[i].listsOrdered);
      if (list[i].tasks)
       tasks.push(list[i].tasks);
      if (list[i].references)
       references.push(list[i].references);
      if (list[i].code) {
        codes.push({
          type: list[i].type,
          code: list[i].code[0]
        });

      }          
    }

    return {
     bolds: bolds,
     codes: codes,
     headings: headings,
     italics: italics,
     italics: italics,
     references: references,
     lists: lists,
     listsOrdered: listsOrdered,
     sections: sections,
     strikethroughs: strikethroughs,
     tasks: tasks
    };
 }

 function isImage(link) {
   return link.indexOf(".png") > 0 || link.indexOf(".gif") > 0 || link.indexOf(".jpg") > 0 || link.indexOf(".jpeg") > 0 || link.indexOf(".svg") > 0;
 }

}

start
  = info:Markdown+ {
  return extractList(info);
}

Markdown
  = EndOfLine / Heading / Bold / Italic / Strikethrough / Tasks / Lists / OrderedLists / InlineCode / MultiplelLineCode / References / ReferencesEmpty / Section / Others / Space 

Digit1_9      = [1-9]
EOF = !.
crlf = '\r\n' / '\r' / '\n'
EatLine = (!crlf !EOF .)*
EndOfLine = ('\r\n' / '\n' / '\r')+
Space = ' '+ / '\t' / EndOfLine
AnyText = [\x20-\x27] / [\x2B-\x40] / [\x41-\x5A] / [\x61-\x7A] / nonascii
ListText = [\x20-\x27] / [\x2B-\x40] / [\x41-\x5A] / [\x60-\x7A] / nonascii
LinkText = [\x20-\x2A] / [\x2B-\x40] / [\x41-\x5B] / [\x61-\x7A] / nonascii
CodeText = [\x20-\x2A] / [\x2B-\x40] / [\x41-\x5F] / [\x61-\x7E] / nonascii / EndOfLine / Space
AnyText2 = [\x20-\x40] / [\x41-\x60] / [\x61-\xFFFF] / nonascii
SectionText = [-]+ / ([\x20-\x40] / [\x41-\x60] / [\x61-\x7A] / nonascii)

Others
  = Space? text:AnyText2+ Space? {
    return {
     others: text.join("")
    }
}

Heading
  = "#"+ text:AnyText+ Space? {
    return {
     heading: text.join("")
    }
}

/* Sceenshot ------------- */
Section
  = text:SectionText+ ('\r\n' / '\n' / '\r') [-]+ EndOfLine? {
    return {
     section: text.join("")
    }
}

/* *Italic* */
Italic
  = (AnyText+)? [\x2A] text:AnyText+ [\x2A] Space?  {
    return {
     italic: text.join("")
    }
}

/* **Italic** */
Bold
  = (AnyText+)? ([\x2A][\x2A] / [\x5F][\x5F]) text:AnyText+ ([\x2A][\x2A] / [\x5F][\x5F]) Space?  {
    return {
     bold: text.join("")
    }
  }

/* ~~Mistaken text.~~ */
Strikethrough
  = [\x7E][\x7E] text:AnyText+ [\x7E][\x7E] Space?  {
    return {
     strikethrough : text.join("")
    }
  }

ListItem
 = ("\x2A " / "\x2D ") text:ListText+ Space?  {return text.join("").trim()}

TaskItem
 = (("- [x] " / "- [ ] ") text:AnyText+ Space?) {return text.join("").trim()}

OrderedListItem
 = "  "? (Digit1_9+ "\x2E ") text:AnyText+ Space? {return text.join("").trim()}

Lists
 = lists:ListItem+ {
   return {
    lists: lists
   }
}

// - [ ] this is an incomplete item
Tasks
 = tasks:TaskItem+ {
   return {
    tasks: tasks
   }
}

OrderedLists
 = lists:OrderedListItem+ {
   return {
    listsOrdered: lists
   }
}

Type
  = "bash" "c" / "cpp" / "html" / "javascript" / "js" / "json"/ "java" / "ruby"

InlineCode
  = AnyText [\x60] text:AnyText+ [\x60] AnyText+ Space? {return text.join("")}

LineCode
  = text:CodeText+ {return text.join("").trim()}

MultiplelLineCode
  = "`"+ ' '? type:(Type)? Space? code:LineCode+ "`"+ Space? {
  return {
    code: code,
    type: type
  }
}

// [Visit GitHub!](www.github.com)
LinkTitle
  = [\x5B] text:LinkText+ [\x5D] {return text.join("")}

LinkTitleEmpty
  = [\x5B] [\x5D] {return ""}

LinkRef
  = [\x28] text:AnyText+ [\x29] {return text.join("")}

References
  = (AnyText+ / "") title:LinkTitle href:LinkRef Space? {
     return {
      references: {
        title: title,
        href: href,
        image: isImage(href)
      }
     }
    }

/* patch empty link name */
ReferencesEmpty
  = (AnyText+ / "") title:LinkTitleEmpty href:LinkRef Space? {
     return {
      references: {
        title: title,
        href: href,
        image: isImage(href)
      }
     }
    }


/* Macros */

h
  = [0-9a-f]i

nonascii
  = [\x80-\uFFFF]

unicode
  = "\\" digits:$(h h? h? h? h? h?) ("\r\n" / [ \t\r\n\f])? {
      return String.fromCharCode(parseInt(digits, 16));
    }

escape
  = unicode
  / "\\" ch:[^\r\n\f0-9a-f]i { return ch; }

nmstart
  = [_a-z]i
  / nonascii
  / escape

nmchar
  = [_a-z0-9-]i
  / nonascii
  / escape

string1
  = '"' chars:([^\n\r\f\\"] / "\\" nl:nl { return ""; } / escape)* '"' {
      return chars.join("");
    }

string2
  = "'" chars:([^\n\r\f\\'] / "\\" nl:nl { return ""; } / escape)* "'" {
      return chars.join("");
    }

string
  = chars: (string1 / [_a-zA-Z0-9-\n]+) { return chars.join("")}

comment
  = "/*" [^*]* "*"+ ([^/*] [^*]* "*"+)* "/"

ident
  = prefix:$"-"? start:nmstart chars:nmchar* {
      return prefix + start + chars.join("");
    }

name
  = chars:nmchar+ { return chars.join(""); }

num
  = [+-]? ([0-9]+ / [0-9]* "." [0-9]+) ("e" [+-]? [0-9]+)? {
      return parseFloat(text());
    }

url
  = chars:([!#$%&*-\[\]-~] / nonascii / escape)* { return chars.join(""); }

s
  = [ \t\r\n\f]+

w
  = s?

nl
  = "\n"
  / "\r\n"
  / "\r"
  / "\f"