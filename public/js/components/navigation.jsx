"use strict"

var React = require('react'),
    dynamicStyle = require('../mixins/dynamicStyle'),
    bindToStore = require('../mixins/bindToStore'),
    pageStore = require('../stores/pageStore'),
    PAGES = require('../constants/pages');

window.PageStore = pageStore;

var getNavigationState = function () {
    return {
        activePageName: pageStore.currentPageName()
    };
};

var Navigation = React.createClass({
    mixins: [dynamicStyle, bindToStore],

    getInitialState: function () {
        return getNavigationState();
    },

    componentWillMount: function () {
        this.onStoreChange(pageStore, function () {
            this.setState(getNavigationState());
        }.bind(this));
    },

    createLink: function (link) {
        var className = this.cs({
            'active': link.pageName == this.state.activePageName
        });

        return <li className={className}><a href={ link.href }>{ link.title }<i className="underline"></i></a></li>
    },

    render: function () {
        return (<ul className="navigation">
            {
                [

                    { title: 'сегодня', pageName: PAGES.MAIN, href: '/' },
                    { title: 'все задачи', pageName: PAGES.TASKS, href: '/tasks' },
                    { title: 'профиль', pageName: PAGES.PROFILE, href: '/profile' }

                ].map(this.createLink)
            }
        </ul>)
    }
});

module.exports = Navigation;