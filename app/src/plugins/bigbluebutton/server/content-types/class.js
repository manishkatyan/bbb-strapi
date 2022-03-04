module.exports = {
  info: {
    tableName: "class",
    singularName: "class", // kebab-case mandatory
    pluralName: "classes", // kebab-case mandatory
    displayName: "Class",
    description: "Class",
    kind: "collectionType",
  },
  options: {
    draftAndPublish: false,
  },
  pluginOptions: {
    "content-manager": {
      visible: false,
    },
    "content-type-builder": {
      visible: false,
    },
  },
  attributes: {
    className: {
      type: "string",
      min: 1,
      configurable: false,
    },
    uid: {
      type: "uid",
    },
    bbbId: {
      type: "string",
      min: 1,
      configurable: false,
    },
    moderatorAccessCode: {
      type: "string",
      min: 1,
      configurable: false,
    },
    viewerAccessCode: {
      type: "string",
      min: 1,
      configurable: false,
    },
    bbbSettings: {
      type: "json",
      configurable: false,
    },
    sessions: {
      type: "relation",
      relation: "oneToMany",
      target: "plugin::bigbluebutton.session",
      mappedBy: "class",
    },
  },
};
