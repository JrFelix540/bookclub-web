import React, { Fragment, useState } from "react";
import { DraftailEditor, BLOCK_TYPE, INLINE_STYLE } from "draftail";
import { Box } from "@chakra-ui/core";

interface RichEditorProps {
    onChange: any;
}

const RichEditor: React.FC<RichEditorProps> = ({ onChange }) => {
    return (
        <Fragment>
            <Box mt={5}>
                <DraftailEditor
                    onSave={onChange.bind(null, "content")}
                    blockTypes={[
                        { type: BLOCK_TYPE.HEADER_ONE },
                        { type: BLOCK_TYPE.UNORDERED_LIST_ITEM },
                        { type: BLOCK_TYPE.ORDERED_LIST_ITEM },
                        { type: BLOCK_TYPE.BLOCKQUOTE },
                    ]}
                    inlineStyles={[
                        { type: INLINE_STYLE.BOLD },
                        { type: INLINE_STYLE.ITALIC },
                    ]}
                />
            </Box>
        </Fragment>
    );
};

export default RichEditor;
