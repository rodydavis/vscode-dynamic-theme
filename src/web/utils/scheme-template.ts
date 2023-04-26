export const SCHEME_TEMPLATE = `
{
  "name": "Material Theme ({{description}})",
  "colors": {
    "list.activeSelectionIconForeground": "{{secondary}}",
    "sideBar.background": "{{surfaceContainerHigh}}",
    "sideBar.foreground": "{{onSurface}}",
    "sideBarTitle.foreground": "{{onSurface}}",
    "sideBarSectionHeader.background": "{{surfaceContainerHighest}}",
    "sideBarSectionHeader.foreground": "{{onSurface}}",
    "activityBar.background": "{{surfaceDim}}",
    "activityBar.foreground": "{{onSurface}}",
    "activityBar.activeBorder": "{{primary}}",
    "activityBarBadge.background": "{{secondary}}",
    "activityBarBadge.foreground": "{{onSecondary}}",
    "selection.background": "{{inversePrimary}}",
    "descriptionForeground": "{{onSurface}}",
    "errorForeground": "{{error}}",
    "icon.foreground": "{{onSurface}}",
    "sash.hoverBorder": "{{primary}}",
    "focusBorder": "{{primary}}",
    "foreground": "{{onSurface}}",
    "window.activeBorder": "{{primary}}",
    "textBlockQuote.background": "{{secondaryContainer}}",
    "textCodeBlock.background": "{{secondaryContainer}}",
    "textLink.foreground": "{{secondary}}",
    "textPreformat.foreground": "{{onSurface}}",
    "textSeparator.foreground": "{{onSurface}}",
    "toolbar.hoverBackground": "{{secondaryContainer}}",
    "toolbar.activeBackground": "{{secondary}}",
    "button.background": "{{primary}}",
    "button.foreground": "{{onPrimary}}",
    "button.secondaryBackground": "{{secondary}}",
    "button.secondaryForeground": "{{onSecondary}}",
    "checkbox.background": "{{secondaryContainer}}",
    "checkbox.foreground": "{{onSecondaryContainer}}",
    "dropdown.background": "{{secondaryContainer}}",
    "dropdown.listBackground": "{{secondaryContainer}}",
    "dropdown.foreground": "{{onSecondaryContainer}}",
    "input.background": "{{secondaryContainer}}",
    "input.foreground": "{{onSecondaryContainer}}",
    "badge.background": "{{primary}}",
    "badge.foreground": "{{onPrimary}}",
    "progressBar.background": "{{primary}}",
    "editorGroup.dropBackground": "{{surfaceDim}}",
    "editorLineNumber.foreground": "{{outline}}",
    "editorLineNumber.activeForeground": "{{primary}}",
    "tab.inactiveBackground": "{{surfaceContainerLow}}",
    "tab.inactiveForeground": "{{onSurface}}",
    "tab.activeBackground": "{{surfaceContainerHigh}}",
    "tab.activeForeground": "{{onSurface}}",
    "tab.hoverBackground": "{{surfaceContainerHighest}}",
    "tab.hoverForeground": "{{onSurface}}",
    "panel.background": "{{surfaceContainerLow}}",
    "panel.dropBorder": "{{surfaceDim}}",
    "panelTitle.activeBorder": "{{primary}}",
    "panelTitle.activeForeground": "{{onSurface}}",
    "list.hoverBackground": "{{surfaceBright}}",
    "list.activeSelectionBackground": "{{surfaceDim}}",
    "list.activeSelectionForeground": "{{onSurface}}",
    "statusBar.background": "{{surfaceDim}}",
    "statusBar.foreground": "{{onSurface}}",
    "statusBar.debuggingBackground": "{{tertiary}}",
    "statusBar.debuggingForeground": "{{onTertiary}}",
    "statusBar.remoteBackground": "{{inverseSurface}}",
    "statusBar.remoteForeground": "{{inversePrimary}}",
    "notificationCenterHeader.background": "{{surfaceContainerHigh}}",
    "notificationCenterHeader.foreground": "{{onSurface}}",
    "notifications.background": "{{surfaceContainer}}",
    "notifications.foreground": "{{onSurface}}",
    "notificationsErrorIcon.foreground": "{{error}}",
    "notificationsWarningIcon.foreground": "{{errorContainer}}",
    "notificationsInfoIcon.foreground": "{{secondary}}",
    "banner.background": "{{inverseSurface}}",
    "banner.foreground": "{{inversePrimary}}",
    "quickInput.background": "{{surface}}",
    "quickInput.foreground": "{{onSurface}}",
    "pickerGroup.foreground": "{{onSurface}}",
    "quickInputList.focusBackground": "{{primaryContainer}}",
    "quickInputList.focusForeground": "{{onPrimaryContainer}}",
    "quickInputList.focusIconForeground": "{{onPrimaryContainer}}",
    "quickInputList.background": "{{surfaceContainer}}",
    {{#high_contrast}}
    "pickerGroup.border": "{{outline}}",
    "notifications.border": "{{outline}}",
    "notificationCenter.border": "{{outline}}",
    "notificationToast.border": "{{outline}}",
    "panelSection.border": "{{outline}}",
    "panelInput.border": "{{outline}}",
    "panelTitle.inactiveForeground": "{{outline}}",
    "inputOption.activeBorder": "{{outline}}",
    "contrastActiveBorder": "{{outline}}",
    "contrastBorder": "{{outlineVariant}}",
    "window.inactiveBorder": "{{outline}}",
    "textBlockQuote.border": "{{outline}}",
    "textLink.activeForeground": "{{outline}}",
    "toolbar.hoverOutline": "{{outline}}",
    "button.border": "{{outline}}",
    "checkbox.border": "{{outline}}",
    "dropdown.border": "{{outline}}",
    "input.border": "{{outline}}",
    "editorGroup.border": "{{outline}}",
    "panel.border": "{{outline}}",
    {{/high_contrast}}
    "editor.background": "{{surface}}",
    "editor.foreground": "{{onSurface}}"
  },
  "tokenColors": [
    {
      "name": "Comments",
      "scope": [
        "comment",
        "punctuation.definition.comment"
      ],
      "settings": {
        "fontStyle": "italic",
        "foreground": "{{custom.comments.color}}"
      }
    },
    {
      "name": "Comments: Preprocessor",
      "scope": "comment.block.preprocessor",
      "settings": {
        "fontStyle": "",
        "foreground": "{{custom.commentsPreprocessor.color}}"
      }
    },
    {
      "name": "Comments: Documentation",
      "scope": [
        "comment.documentation",
        "comment.block.documentation"
      ],
      "settings": {
        "foreground": "{{custom.commentsDocumentation.color}}"
      }
    },
    {
      "name": "Invalid - Illegal",
      "scope": "invalid.illegal",
      "settings": {
        "foreground": "{{custom.invalidIllegal.color}}"
      }
    },
    {
      "name": "Operators",
      "scope": "keyword.operator",
      "settings": {
        "foreground": "{{custom.operators.color}}"
      }
    },
    {
      "name": "Keywords",
      "scope": [
        "keyword",
        "storage"
      ],
      "settings": {
        "foreground": "{{custom.keywords.color}}"
      }
    },
    {
      "name": "Types",
      "scope": [
        "storage.type",
        "support.type"
      ],
      "settings": {
        "foreground": "{{custom.types.color}}"
      }
    },
    {
      "name": "Language Constants",
      "scope": [
        "constant.language",
        "support.constant",
        "variable.language"
      ],
      "settings": {
        "foreground": "{{custom.languageConstants.color}}"
      }
    },
    {
      "name": "Variables",
      "scope": [
        "variable",
        "support.variable"
      ],
      "settings": {
        "foreground": "{{custom.variables.color}}"
      }
    },
    {
      "name": "Functions",
      "scope": [
        "entity.name.function",
        "support.function"
      ],
      "settings": {
        "fontStyle": "bold",
        "foreground": "{{custom.functions.color}}"
      }
    },
    {
      "name": "Classes",
      "scope": [
        "entity.name.type",
        "entity.other.inherited-class",
        "support.class"
      ],
      "settings": {
        "fontStyle": "bold",
        "foreground": "{{custom.classes.color}}"
      }
    },
    {
      "name": "Exceptions",
      "scope": "entity.name.exception",
      "settings": {
        "foreground": "{{custom.exceptions.color}}"
      }
    },
    {
      "name": "Sections",
      "scope": "entity.name.section",
      "settings": {
        "fontStyle": "bold"
      }
    },
    {
      "name": "Numbers, Characters",
      "scope": [
        "constant.numeric",
        "constant.character",
        "constant"
      ],
      "settings": {
        "foreground": "{{custom.numbers.color}}"
      }
    },
    {
      "name": "Strings",
      "scope": "string",
      "settings": {
        "foreground": "{{custom.strings.color}}"
      }
    },
    {
      "name": "Strings: Escape Sequences",
      "scope": "constant.character.escape",
      "settings": {
        "foreground": "{{custom.stringsEscapeSequences.color}}"
      }
    },
    {
      "name": "Strings: Regular Expressions",
      "scope": "string.regexp",
      "settings": {
        "foreground": "{{custom.stringsRegularExpressions.color}}"
      }
    },
    {
      "name": "Strings: Symbols",
      "scope": "constant.other.symbol",
      "settings": {
        "foreground": "{{custom.stringsRegularSymbols.color}}"
      }
    },
    {
      "name": "Punctuation",
      "scope": "punctuation",
      "settings": {
        "foreground": "{{custom.punctuation.color}}"
      }
    },
    {
      "name": "HTML: Doctype Declaration",
      "scope": [
        "meta.tag.sgml.doctype",
        "meta.tag.sgml.doctype string",
        "meta.tag.sgml.doctype entity.name.tag",
        "meta.tag.sgml punctuation.definition.tag.html"
      ],
      "settings": {
        "foreground": "{{custom.htmlDoctypeDeclaration.color}}"
      }
    },
    {
      "name": "HTML: Tags",
      "scope": [
        "meta.tag",
        "punctuation.definition.tag.html",
        "punctuation.definition.tag.begin.html",
        "punctuation.definition.tag.end.html"
      ],
      "settings": {
        "foreground": "{{custom.htmlTags.color}}"
      }
    },
    {
      "name": "HTML: Tag Names",
      "scope": "entity.name.tag",
      "settings": {
        "foreground": "{{custom.htmlTagNames.color}}"
      }
    },
    {
      "name": "HTML: Attribute Names",
      "scope": [
        "meta.tag entity.other.attribute-name",
        "entity.other.attribute-name.html"
      ],
      "settings": {
        "fontStyle": "italic",
        "foreground": "{{custom.htmlAttributeNames.color}}"
      }
    },
    {
      "name": "HTML: Entities",
      "scope": [
        "constant.character.entity",
        "punctuation.definition.entity"
      ],
      "settings": {
        "foreground": "{{custom.htmlEntities.color}}"
      }
    },
    {
      "name": "CSS: Selectors",
      "scope": [
        "meta.selector",
        "meta.selector entity",
        "meta.selector entity punctuation",
        "entity.name.tag.css"
      ],
      "settings": {
        "foreground": "{{custom.cssSelectors.color}}"
      }
    },
    {
      "name": "CSS: Property Names",
      "scope": [
        "meta.property-name",
        "support.type.property-name"
      ],
      "settings": {
        "foreground": "{{custom.cssPropertyNames.color}}"
      }
    },
    {
      "name": "CSS: Property Values",
      "scope": [
        "meta.property-value",
        "meta.property-value constant.other",
        "support.constant.property-value"
      ],
      "settings": {
        "foreground": "{{custom.cssPropertyValues.color}}"
      }
    },
    {
      "name": "CSS: Important Keyword",
      "scope": "keyword.other.important",
      "settings": {
        "fontStyle": "bold"
      }
    },
    {
      "name": "Markup: Changed",
      "scope": "markup.changed",
      "settings": {
        "foreground": "{{custom.markupChanged.color}}"
      }
    },
    {
      "name": "Markup: Deletion",
      "scope": "markup.deleted",
      "settings": {
        "foreground": "{{custom.markupDeletion.color}}"
      }
    },
    {
      "name": "Markup: Emphasis",
      "scope": "markup.italic",
      "settings": {
        "fontStyle": "italic"
      }
    },
    {
      "name": "Markup: Error",
      "scope": "markup.error",
      "settings": {
        "foreground": "{{custom.markupError.color}}"
      }
    },
    {
      "name": "Markup: Insertion",
      "scope": "markup.inserted",
      "settings": {
        "foreground": "{{custom.markupInsertion.color}}"
      }
    },
    {
      "name": "Markup: Link",
      "scope": "meta.link",
      "settings": {
        "foreground": "{{custom.markupLink.color}}"
      }
    },
    {
      "name": "Markup: Output",
      "scope": [
        "markup.output",
        "markup.raw"
      ],
      "settings": {
        "foreground": "{{custom.markupOutput.color}}"
      }
    },
    {
      "name": "Markup: Prompt",
      "scope": "markup.prompt",
      "settings": {
        "foreground": "{{custom.markupPrompt.color}}"
      }
    },
    {
      "name": "Markup: Heading",
      "scope": "markup.heading",
      "settings": {
        "foreground": "{{custom.markupHeading.color}}"
      }
    },
    {
      "name": "Markup: Strong",
      "scope": "markup.bold",
      "settings": {
        "fontStyle": "bold"
      }
    },
    {
      "name": "Markup: Traceback",
      "scope": "markup.traceback",
      "settings": {
        "foreground": "{{custom.markupTraceback.color}}"
      }
    },
    {
      "name": "Markup: Underline",
      "scope": "markup.underline",
      "settings": {
        "fontStyle": "underline"
      }
    },
    {
      "name": "Markup Quote",
      "scope": "markup.quote",
      "settings": {
        "foreground": "{{custom.markupQuote.color}}"
      }
    },
    {
      "name": "Markup Lists",
      "scope": "markup.list",
      "settings": {
        "foreground": "{{custom.markupLists.color}}"
      }
    },
    {
      "name": "Markup Styling",
      "scope": [
        "markup.bold",
        "markup.italic"
      ],
      "settings": {
        "foreground": "{{custom.markupStyling.color}}"
      }
    },
    {
      "name": "Markup Inline",
      "scope": "markup.inline.raw",
      "settings": {
        "fontStyle": "",
        "foreground": "{{custom.markupInline.color}}"
      }
    },
    {
      "name": "Extra: Diff Range",
      "scope": [
        "meta.diff.range",
        "meta.diff.index",
        "meta.separator"
      ],
      "settings": {
        "foreground": "{{custom.extraDiffRange.color}}"
      }
    },
    {
      "name": "Extra: Diff From",
      "scope": "meta.diff.header.from-file",
      "settings": {
        "foreground": "{{custom.extraDiffFrom.color}}"
      }
    },
    {
      "name": "Extra: Diff To",
      "scope": "meta.diff.header.to-file",
      "settings": {
        "foreground": "{{custom.extraDiffTo.color}}"
      }
    }
  ]
}
`;