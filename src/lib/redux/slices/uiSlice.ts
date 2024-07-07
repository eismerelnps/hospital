import { IModal } from "@/lib/components/commons/Modal/IModal";
import { CHAT_TYPE } from "@/lib/interfaces/Chat/ChatType.enum";
import { IChat, IChatOptionMetadata, IDeleteChatMetadata, ISelectedChatsMetadata } from "@/lib/interfaces/Chat/IChat";
import { IDeleteMessageMetadata, IEditMessageMetadata, IForwardMessageMetadata, IMessageOptionMetadata, IReplyMessageMetadata, ISelectedMessageMetadata, ISendMessage } from "@/lib/interfaces/Messages/IMessage";
import { MESSAGE_FILE_TYPE } from "@/lib/interfaces/Messages/MessageFileType.enum";
import { NotificationInterface } from "@/lib/interfaces/UI/Notification/NotificationInterface";
import { UI_LOADING_STATE } from "@/lib/interfaces/UI/UI_Loading_State-enum";
import { UI_SEARCHING_STATE } from "@/lib/interfaces/UI/UI_SEARCHING_STATE.enum";
import { UI_contacts_metadata } from "@/lib/interfaces/UI/UI_contacts_metadata";
import { IContactOptionMetadata } from "@/lib/interfaces/Users/IUser";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Socket } from 'socket.io-client';

type UISearchType = {
    avaiableChats: string,
    contacts: string,
    messages: string
}

const UISearchInitialState: UISearchType = {
    avaiableChats: '',
    contacts: '',
    messages: ''
};
const MessageOptionMetadata_InitialState: IMessageOptionMetadata = {
    open: false,
    message: null,
    chat_id: '',
    x: '',
    y: ''
};
const ChatOptionMetadata_InitialState: IChatOptionMetadata = {
    open: false,
    chat: null,
    chat_id: '',
    x: '',
    y: ''
};
const ContactsOptionMetadata_InitialState: IContactOptionMetadata = {
    open: false,
    contact: null,
    contact_id: '',
    x: '',
    y: ''
};
const UI_contacts_metadata_InitialState: UI_contacts_metadata = {
    delete_contact: false,
    create_contact: false,
    edit_contact: false,
    select_contact: false,
    selected_contacts: [],
    selected_contacts_id: [],
    search_contact: '',
    manage_contact: false
};
const ReplyMessageMetadataInitialState: IReplyMessageMetadata = {
    _id: '',
    message_text: '',
    author: {
        name: '',
        _id: ''
    },
    file_type: MESSAGE_FILE_TYPE.TEXT,
};
const DeleteMessageMetadata_InitialState: IDeleteMessageMetadata = {
    open: false,
    messages_id: [''],
    chat_id: '',
    delete_on_both_chats: false
};
const DeleteChatMetadata_InitialState: IDeleteChatMetadata = {
    open: false,
    chats_id: [],
    delete_on_both_chats: false
};
const ForwardMessageMetadata_InitialState: IForwardMessageMetadata = {
    open: false,
    forward_to: '',
    messages: []
};
const EditMessageMetadate_InitialState: IEditMessageMetadata = {
    open: false,
    message_id: '',
    chat_id: '',
    message_text: '',
};
const SelectedMessageMetadata_InitialState: ISelectedMessageMetadata = {
    open: false,
    messages_id: [],
    messages: [],
    chat_id: ''
};
const SelectedChatsMetadata_InitialState: ISelectedChatsMetadata = {
    open: false,
    chats_id: [],
    chats: [],
    chat_id: ''
};

type UiInitialStateType = {
    keepUserAuthData: boolean,
    loading: Array<UI_LOADING_STATE>,
    notifications: Array<NotificationInterface>,
    chats: Array<IChat>,
    chat: IChat,
    modal: IModal,
    mainSocket: Socket | null,
    chatInfo: boolean,
    searching: Array<UI_SEARCHING_STATE>,
    uiSearch: UISearchType,
    searchedMessageId: string,

    messageOptionMetadata: IMessageOptionMetadata,
    chatOptionMetadata: IChatOptionMetadata,
    contactsOptionMetadata: IContactOptionMetadata,

    replyMessageMetadata: IReplyMessageMetadata,
    forwardMessageMetadata: IForwardMessageMetadata,
    ui_contacts_metadata: UI_contacts_metadata,

    deleteMessageMetadata: IDeleteMessageMetadata,
    deleteChatMetadata: IDeleteChatMetadata,
    blockChatMetadata: boolean,
    unBlockChatMetadata: boolean,

    muteChatMetadata: boolean,
    unMuteChatMetadata: boolean,

    editMessageMetadata: IEditMessageMetadata,
    selectedMessageMetadata: ISelectedMessageMetadata,
    selectedChatsMetadata: ISelectedChatsMetadata,

    seeOnlineUsers: boolean,
};
const initialChatState: IChat = {
    _id: '',
    imageProfile: '',
    name: '',
    description: '',
    messages: [],
    starredMessages: [],
    blocked: false,
    muted: false,
    members: [],
    type: CHAT_TYPE.NULL
};

const initialModalState: IModal = {
    open: false,
    title: '',
    description: '',
    children: null,
    cancelButton: { text: '', action: () => { } },
    acceptButton: { text: '', action: () => { } },
};


const initialState: UiInitialStateType = {
    keepUserAuthData: false,
    loading: [],
    notifications: [],
    chats: [],
    chat: initialChatState,

    modal: initialModalState,

    mainSocket: null,
    chatInfo: false,
    searching: [],
    uiSearch: UISearchInitialState,
    searchedMessageId: '',

    messageOptionMetadata: MessageOptionMetadata_InitialState,
    chatOptionMetadata: ChatOptionMetadata_InitialState,
    contactsOptionMetadata: ContactsOptionMetadata_InitialState,

    replyMessageMetadata: ReplyMessageMetadataInitialState,
    forwardMessageMetadata: ForwardMessageMetadata_InitialState,
    ui_contacts_metadata: UI_contacts_metadata_InitialState,

    deleteMessageMetadata: DeleteMessageMetadata_InitialState,
    deleteChatMetadata: DeleteChatMetadata_InitialState,
    blockChatMetadata: false,
    unBlockChatMetadata: false,
    muteChatMetadata: false,
    unMuteChatMetadata: false,

    editMessageMetadata: EditMessageMetadate_InitialState,
    selectedMessageMetadata: SelectedMessageMetadata_InitialState,
    selectedChatsMetadata: SelectedChatsMetadata_InitialState,
    seeOnlineUsers: false
}

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        //ADD A NEW LOADING STATE TO APP 
        uiSetLoading: (state, action) => {
            if (state.loading.some((loading: string) => loading === action.payload)) return state;
            const newLoading = [...state.loading, action.payload];
            return {
                ...state,
                loading: newLoading,
            };
        },

        //FINISH A LOADING STATE IF IT'S CURRENTLY RUNNING
        uiFinishLoading: (state, action) => {
            const newLoading = state.loading.filter((loading: string) => loading !== action.payload);
            return {
                ...state,
                loading: newLoading,
            };
        },

        //ADD A NEW LOADING STATE TO APP 
        uiSetSearching: (state, action) => {
            if (state.searching.some((search: string) => search === action.payload)) return state;
            const newSearching = [...state.searching, action.payload];
            return {
                ...state,
                searching: newSearching,
            };
        },

        //FINISH A LOADING STATE IF IT'S CURRENTLY RUNNING
        uiFinishSearching: (state, action) => {
            const newLoSearching = state.searching.filter((search: string) => search !== action.payload);
            return {
                ...state,
                searching: newLoSearching,
            };
        },

        //
        uiUpdateSearchState: (state, action) => {
            const { key, value } = action.payload;
            if (state.uiSearch.hasOwnProperty(key)) {
                return {
                    ...state,
                    uiSearch: {
                        ...state.uiSearch,
                        [key]: value
                    }
                }
            }
            return state
        },

        // SET A SEARCHED AND FOUND MESSAGE ID
        uiSetSearchedMessageId: (state, action: PayloadAction<string>) => {
            return {
                ...state,
                searchedMessageId: action.payload
            }
        },

        // CLEAR CURRENTLY SEARCHED MESSAGE ID
        uiClearSearchedMessageId: (state) => {
            return {
                ...state,
                searchedMessageId: ''
            }
        },

        // LAUNCH A NEW NOTIFICATION 
        uiSetNotification: (state, action) => {
            const newNotifications = [...state.notifications, action.payload];
            return {
                ...state,
                notifications: newNotifications,
            };
        },

        // DELETE A NOTIFICATION 
        uiDeleteNotification: (state, action) => {
            const indexToRemove = action.payload;
            const newNotifications = state.notifications.filter((_, index) => index !== indexToRemove);
            return {
                ...state,
                notifications: newNotifications,
            };
        },

        // SET A CHAT
        uiSetChat: (state, action: PayloadAction<IChat>) => {
            return {
                ...state,
                chat: action.payload
            }
        },

        // CLOSE CURRENTLY OPENED CHAT
        uiCloseChat: (state) => {
            // chat: initialChatState
            return {
                ...state,
                chat: initialChatState
            }
        },

        ///// cgpt 1
        uiAddMessage: (state, action) => {
            const message = action.payload;
            const isMessageOn = state.chat.messages && state.chat.messages.some((message) => message._id === action.payload._id);

            if (!isMessageOn) {
                // El mensaje no está en la lista, devolvemos un nuevo estado con el mensaje agregado
                return {
                    ...state,
                    chat: {
                        ...state.chat,
                        messages: [...state.chat.messages, message]
                    },
                };
            }

            // Si el mensaje ya está en la lista, simplemente devolvemos el estado existente sin cambios
            return state;
        },

        // TO OPEN A MODAL
        uiSetModal: (state, action) => {
            return {
                ...state,
                modal: action.payload
            }
        },

        // CLOSE CURRENTLY OPENED MODAL
        uiCloseModal: (state) => {
            return {
                ...state,
                modal: initialModalState
            }
        },

        // SET THE MAIN SOCKET OF APP
        uiSetMainSocket: (state, action) => {
            return {
                ...state,
                mainSocket: action.payload
            }
        },

        // TOGGLES IF CHAT INFO WILL BE SHOWN OR NOT
        uiToggleChatInfoState: (state) => {
            return {
                ...state,
                chatInfo: !state.chatInfo
            }
        },


        // SET MESSAGE OPTION METADATA
        uiSetMessageOptionMetadata: (state, action: PayloadAction<IMessageOptionMetadata>) => {
            return {
                ...state,
                messageOptionMetadata: action.payload
            }
        },
        // CLEAR MESSAGE OPTION METADATA
        uiCleartMessageOptionMetadata: (state) => {
            return {
                ...state,
                messageOptionMetadata: MessageOptionMetadata_InitialState
            }
        },


        // SET CHAT OPTION METADATA
        uiSetChatOptionMetadata: (state, action: PayloadAction<IChatOptionMetadata>) => {
            return {
                ...state,
                chatOptionMetadata: action.payload
            }
        },
        // CLEAR CHAT OPTION METADATA
        uiClearChatOptionMetadata: (state) => {
            return {
                ...state,
                chatOptionMetadata: ChatOptionMetadata_InitialState
            }
        },

        // SET CONTACTS OPTION METADATA
        uiSetContacttOptionMetadata: (state, action: PayloadAction<IContactOptionMetadata>) => {
            return {
                ...state,
                contactsOptionMetadata: action.payload
            }
        },
        // CLEAR CONTACTS OPTION METADATA
        uiClearContactOptionMetadata: (state) => {
            return {
                ...state,
                contactsOptionMetadata: ContactsOptionMetadata_InitialState
            }
        },

        //ENABLES REPLY MESSAGE FOR TYPE INPUT
        uiSetReplyMessageMetadata: (state, action: PayloadAction<ISendMessage>) => {
            const message = action.payload
            return {
                ...state,
                replyMessageMetadata: {
                    _id: message._id,
                    author: {
                        _id: message.author._id,
                        name: message.author.name
                    },
                    message_text: message.message_text,
                    file_type: message.file_type
                }
            }
        },

        //DISABLES REPLY MESSAGE FOR TYPE INPUT
        uiFinishReplyMessageMetadata: (state) => {
            return {
                ...state,
                replyMessageMetadata: ReplyMessageMetadataInitialState
            }
        },

        ////////////////////////////////////
        //SET FORWARD MESSAGE METADATA STATE
        uiSetForwardMessageMetadata: (state, action: PayloadAction<IForwardMessageMetadata>) => {
            console.log('uiSetForwardMessageMetadata', action.payload)
            return {
                ...state,
                forwardMessageMetadata: action.payload
            }
        },
        //CLEARS FORWARD MESSAGE METADATA STATE
        uiClearForwardMessageMetadata: (state) => {
            return {
                ...state,
                forwardMessageMetadata: ForwardMessageMetadata_InitialState
            }
        },

        /////////////////////////////////////
        // SET  DELETE MESSAGE METADATA STATE
        uiSetDeleteMessageMetadata: (state, action: PayloadAction<IDeleteMessageMetadata>) => {
            return {
                ...state,
                deleteMessageMetadata: action.payload
            }
        },
        //CLEARS DELETE MESSAGE METADATA STATE
        uiClearDeleteMessageMetadata: (state) => {
            return {
                ...state,
                deleteMessageMetadata: DeleteMessageMetadata_InitialState
            }
        },

        /////////////////////////////////////
        // SET  DELETE CHAT METADATA STATE
        uiSetDeleteChatMetadata: (state, action: PayloadAction<IDeleteChatMetadata>) => {
            return {
                ...state,
                deleteChatMetadata: action.payload
            }
        },
        //CLEARS DELETE MESSAGE METADATA STATE
        uiClearDeleteChatMetadata: (state) => {
            return {
                ...state,
                deleteChatMetadata: DeleteChatMetadata_InitialState
            }
        },

        //////////////////////////////////
        // ENABLES BLOCK CHAT METADATA
        uiSetBlockChatMetadata: (state) => {
            return {
                ...state,
                blockChatMetadata: true
            }
        },
        uiClearBlockChatMetadata: (state) => {
            return {
                ...state,
                blockChatMetadata: false
            }
        },
        //////////////////////////////////
        // ENABLES UNBLOCK CHAT METADATA
        uiSetUnBlockChatMetadata: (state) => {
            return {
                ...state,
                unBlockChatMetadata: true
            }
        },
        uiClearUnBlockChatMetadata: (state) => {
            return {
                ...state,
                unBlockChatMetadata: false
            }
        },
        //////////////////////////////////
        // ENABLES MUTE CHAT METADATA
        uiSetMuteChatMetadata: (state) => {
            return {
                ...state,
                muteChatMetadata: true
            }
        },
        uiClearMuteChatMetadata: (state) => {
            return {
                ...state,
                muteChatMetadata: false
            }
        },
        //////////////////////////////////
        // ENABLES MUTE CHAT METADATA
        uiSetunMuteChatMetadata: (state) => {
            return {
                ...state,
                unMuteChatMetadata: true
            }
        },
        uiClearunMuteChatMetadata: (state) => {
            return {
                ...state,
                unMuteChatMetadata: false
            }
        },

        /////////////////////////////////
        // SET  EDIT MESSAGE METADATA STATE
        uiSetEditMessageMetadata: (state, action: PayloadAction<IEditMessageMetadata>) => {
            return {
                ...state,
                editMessageMetadata: action.payload
            }
        },
        //CLEARS EDIT MESSAGE METADATA STATE
        uiClearEditMessageMetadata: (state) => {
            return {
                ...state,
                editMessageMetadata: EditMessageMetadate_InitialState
            }
        },

        /////////////////////////////////
        // SET  EDIT MESSAGE METADATA STATE
        uiSetSelectedMessageMetadata: (state, action: PayloadAction<ISelectedMessageMetadata>) => {
            return {
                ...state,
                selectedMessageMetadata: action.payload
            }
        },
        //CLEARS EDIT MESSAGE METADATA STATE
        uiClearSelectedMessageMetadata: (state) => {
            return {
                ...state,
                selectedMessageMetadata: SelectedMessageMetadata_InitialState
            }
        },

        /////////////////////////////////
        // SET  EDIT CHAT METADATA STATE
        uiSetSelectedChatsMetadata: (state, action: PayloadAction<ISelectedChatsMetadata>) => {
            return {
                ...state,
                selectedChatsMetadata: action.payload
            }
        },
        //CLEARS EDIT CHAT METADATA STATE
        uiClearSelectedChatsMetadata: (state) => {
            return {
                ...state,
                selectedChatsMetadata: SelectedChatsMetadata_InitialState
            }
        },


        ////////////////////////////////
        uiAddSelectedMessage: (state, action: PayloadAction<ISendMessage>) => {
            const { _id: message_id } = action.payload;



            // Verificar si el message_id ya está en el array
            const index = state.selectedMessageMetadata.messages_id.indexOf(message_id);
            // Verificar si hay solo un mensaje seleccionado y si es el que estamos eliminando
            const isLastMessage = state.selectedMessageMetadata.messages_id.length === 1 && index !== -1;

            if (index !== -1) {
                // Si el message_id ya está en el array, lo eliminamos
                const updatedMessagesId = state.selectedMessageMetadata.messages_id.filter(msg_id => msg_id !== message_id);
                const updatedMessages = state.selectedMessageMetadata.messages.filter(msg => msg._id !== message_id);


                if (isLastMessage) {
                    // Si es el último mensaje, restablecemos el estado a su valor inicial
                    return {
                        ...state,
                        selectedMessageMetadata: SelectedMessageMetadata_InitialState
                    };
                }
                else {
                    // Si no es el último mensaje, actualizamos el estado sin el mensaje eliminado
                    return {
                        ...state,
                        selectedMessageMetadata: {
                            ...state.selectedMessageMetadata,
                            messages_id: updatedMessagesId,
                            messages: updatedMessages,
                        }
                    };
                }
            } else {
                // Si el message_id no está en el array, lo agregamos
                return {
                    ...state,
                    selectedMessageMetadata: {
                        ...state.selectedMessageMetadata,
                        messages_id: [...state.selectedMessageMetadata.messages_id, message_id],
                        messages: [...state.selectedMessageMetadata.messages, action.payload]
                    }
                };
            }
        },

        ////////////////////////////////
        uiAddSelectedChat: (state, action: PayloadAction<IChat>) => {
            const { _id: chat_id } = action.payload;

            // Verificar si el chat_id ya está en el array
            const index = state.selectedChatsMetadata.chats_id.indexOf(chat_id);
            // Verificar si hay solo un chat seleccionado y si es el que estamos eliminando
            const isLastChat = state.selectedChatsMetadata.chats_id.length === 1 && index !== -1;

            console.log('isLastChat', isLastChat);

            if (index !== -1) {
                // Si el chat_id ya está en el array, lo eliminamos
                const updatedChatsId = state.selectedChatsMetadata.chats_id.filter(c_id => c_id !== chat_id);
                const updatedChats = state.selectedChatsMetadata.chats.filter(msg => msg._id !== chat_id);

                if (isLastChat) {
                    // Si es el último mensaje, restablecemos el estado a su valor inicial
                    return {
                        ...state,
                        selectedChatsMetadata: SelectedChatsMetadata_InitialState
                    };
                }
                else {
                    // Si no es el último mensaje, actualizamos el estado sin el mensaje eliminado
                    return {
                        ...state,
                        selectedChatsMetadata: {
                            ...state.selectedChatsMetadata,
                            chats_id: updatedChatsId,
                            chats: updatedChats,
                        }
                    };
                }
            } else {
                // Si el chat_id no está en el array, lo agregamos
                return {
                    ...state,
                    selectedChatsMetadata: {
                        ...state.selectedChatsMetadata,
                        chats_id: [...state.selectedChatsMetadata.chats_id, chat_id],
                        chats: [...state.selectedChatsMetadata.chats, action.payload]
                    }
                };
            }
        },


        /////////////////////////////////
        // SET  EDIT CHAT METADATA STATE
        uiSetContactsMetadata: (state, action: PayloadAction<UI_contacts_metadata>) => {
            return {
                ...state,
                ui_contacts_metadata: action.payload
            }
        },
        //CLEARS EDIT CHAT METADATA STATE
        uiClearContactsMetadata: (state) => {
            return {
                ...state,
                ui_contacts_metadata: UI_contacts_metadata_InitialState
            }
        },

        uiToggleSeeOnlineUsers: (state, action: PayloadAction<boolean>) => {
            return {
                ...state,
                seeOnlineUsers: action.payload
            }
        }

    },
});
export const {
    uiSetLoading,
    uiFinishLoading,
    uiSetSearching,
    uiFinishSearching,
    uiSetSearchedMessageId,
    uiUpdateSearchState,
    uiClearSearchedMessageId,
    uiSetNotification,
    uiDeleteNotification,
    uiSetChat,
    uiCloseChat,
    uiAddMessage,
    uiSetModal,
    uiCloseModal,
    uiSetMainSocket,
    uiToggleChatInfoState,

    uiSetMessageOptionMetadata,
    uiCleartMessageOptionMetadata,

    uiSetContacttOptionMetadata,
    uiClearContactOptionMetadata,

    uiSetChatOptionMetadata,
    uiClearChatOptionMetadata,

    uiSetReplyMessageMetadata,
    uiFinishReplyMessageMetadata,

    uiSetForwardMessageMetadata,
    uiClearForwardMessageMetadata,

    uiSetDeleteMessageMetadata,
    uiClearDeleteMessageMetadata,

    uiSetContactsMetadata,
    uiClearContactsMetadata,

    //CHAT OPTIONS
    uiSetDeleteChatMetadata,
    uiClearDeleteChatMetadata,
    uiSetBlockChatMetadata,
    uiClearBlockChatMetadata,
    uiSetUnBlockChatMetadata,
    uiClearUnBlockChatMetadata,
    uiSetMuteChatMetadata,
    uiClearMuteChatMetadata,
    uiSetunMuteChatMetadata,
    uiClearunMuteChatMetadata,

    uiSetEditMessageMetadata,
    uiClearEditMessageMetadata,

    uiSetSelectedMessageMetadata,
    uiClearSelectedMessageMetadata,
    uiAddSelectedMessage,

    uiSetSelectedChatsMetadata,
    uiClearSelectedChatsMetadata,
    uiAddSelectedChat,

    uiToggleSeeOnlineUsers

} = uiSlice.actions;
export default uiSlice.reducer;