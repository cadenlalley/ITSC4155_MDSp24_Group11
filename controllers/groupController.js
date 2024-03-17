exports.index = (req, res) => {
    let activePage = 'groups';

    res.render("group/index", { activePage });
}
