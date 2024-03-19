exports.index = (req, res) => {
    const activePage = 'friends';

    res.render('friend/index', { activePage });
}
