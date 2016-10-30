'use babel';

import TreeViewStayRightView from './tree-view-stay-right-view';
import { CompositeDisposable } from 'atom';

export default {

  treeViewStayRightView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.treeViewStayRightView = new TreeViewStayRightView(state.treeViewStayRightViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.treeViewStayRightView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'tree-view-stay-right:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.treeViewStayRightView.destroy();
  },

  serialize() {
    return {
      treeViewStayRightViewState: this.treeViewStayRightView.serialize()
    };
  }

};
