let input = `
<@ let users = ["Thắng", "Nam", "Huy"]; @>
<html>
    <body>
        <h1>Danh sách thành viên:</h1>
        <@ for (let i = 0; i < users.length; i++) { @>
            <@ let user = users[i] @>
            <@ if (user != "Nam") { @>
                <p><@- user @></p>
            <@ } @>
        <@ } @>
    </body>
</html>
`;

let engine = function (template, stringJoin = "var render = [];") {
  if (/<@([^%>]+)?@>/g.exec(template)) {
    const firstCommandMatch = /<@([^%>]+)?@>/g.exec(template)[0];
    const command = /<@([^%>]+)?@>/g.exec(template)[1].trim();

    // before command has string
    if (template.indexOf(firstCommandMatch) !== 0) {
      stringJoin +=
        'render.push("' +
        template.slice(0, template.indexOf(firstCommandMatch)) +
        '");';
      template = template.slice(
        template.indexOf(firstCommandMatch),
        template.length
      );
      return engine(template, stringJoin);
    }
    // show value
    if (/<@-([^%>]+)?@>/g.exec(firstCommandMatch)) {
      stringJoin += "render.push(" + /<@-([^%>]+)?@>/g.exec(template)[1] + ");";
      template = template.replace(firstCommandMatch, "");
      return engine(template, stringJoin);
    }
    // common command
    stringJoin += command + "\n";
    template = template.replace(firstCommandMatch, "");

    return engine(template, stringJoin);
  }
  stringJoin += 'render.push("' + template + '");';
  stringJoin += 'render.join("");';

  return eval(stringJoin).replace(/(\r\n|\n|\r)/gm, "");
};

let result = engine(input.replace(/(\r\n|\n|\r)/gm, ""));
console.log(result);
