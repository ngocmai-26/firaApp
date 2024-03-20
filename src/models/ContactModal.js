import { useLayoutEffect, useState } from 'react'
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome6'
import {
  CONTACT_RESPONSE,
  CONTACT_SEARCH_MODAL_TYPE,
  DEFAULT_AVATAR,
} from '../app/static'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchContact, setSearchContent } from '../slices/SearchSlice'
import { searchContactAsync } from '../thunks/SearchThunk'
import {
  destroyContactRequest,
  responseContact,
  sendAddContactRequest,
} from '../thunks/ContractThunk'

function ContactModel({ setOpen }) {
  const [modalType, setModalType] = useState(CONTACT_SEARCH_MODAL_TYPE.SEARCH)
  const { searchContact, searchContent, searching } = useSelector(
    (state) => state.searchReducer,
  )
  const {
    contactRequest,
    allContact,
    addContactLoadingId,
    addContactRequest,
  } = useSelector((state) => state.contactReducer)
  const { user } = useSelector((state) => state.authReducer)

  useLayoutEffect(() => {
  }, [addContactRequest, allContact, contactRequest])

  const dispatch = useDispatch()

  const handleResponseAddFriendRequest = (type, contactId) => {
    const data = {
      contactId: contactId,
      command: type,
    }
    dispatch(responseContact(data))
  }

  useLayoutEffect(() => {
    if (searchContent?.trim() !== '') {
      dispatch(searchContactAsync(searchContent))
    }
    dispatch(setSearchContact([]))
  }, [searchContent])

  const [searchKeyword, setSearchKeyword] = useState('')

  const handleSearchContact = () => {
    dispatch(setSearchContent(searchKeyword || ''))
  }

  const handleSendContactRequest = (toId) => {
    dispatch(
      sendAddContactRequest({
        from: user?.id,
        to: toId,
      }),
    )
  }

  const SearchModalContent = ({ content, onChangeSearch }) => {
    return (
      <ScrollView style={styles.scroll}>
        <View style={styles.scrollItem}>
          {searchContact.map((item, index) => (
            <View
              key={index.toString()}
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                marginVertical: 5,
              }}
            >
              <View style={[styles.containerUserItem, { flex: 2 }]}>
                <View style={styles.imageUserItem}>
                  <Image
                    source={{ uri: item.avatar }}
                    style={styles.imageItem}
                  />
                </View>
                <View
                  style={[
                    styles.textUserItem,
                    // widthContent && { width: widthContentUserItem },
                  ]}
                >
                  <Text style={styles.nameUserItem}>{item.fullName}</Text>
                  {item.email && (
                    <Text style={styles.emailUserItem}>{item.email}</Text>
                  )}
                </View>
              </View>
              <View style={styles.requestBtn}>
                <TouchableOpacity
                  onPress={() => handleSendContactRequest(item.id)}
                  style={styles.buttonRequest}
                >
                  {/* {addContactLoadingId.filter((v) => v == item.id).length > 0 ? (
                      <Spinner color={"gray"} />
                    ) : (
                      <FontAwesomeIcon icon={faUserPlus} style={styles.icon} />
                    )} */}

                  <Icon name="user-plus" size={20} color="#3498db" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
          {searchContact.length === 0 && (
            <Text style={styles.emptyText}>Kết quả tìm kiếm</Text>
          )}
        </View>
      </ScrollView>
    )
  }

  const handleCloseModal = () => {
    setOpen(!setOpen)
  }

  const AddContactRequestModalContent = () => {
    return (
      <View
        style={[
          styles.contactModal,
          modalType === CONTACT_SEARCH_MODAL_TYPE.REQUEST
            ? styles.block
            : styles.hidden,
        ]}
      >
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Yêu cầu kết bạn</Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.searchContent}>
          <ScrollView style={styles.scroll}>
            <View style={styles.scrollItem}>
              {contactRequest.map((item) => (
                <View
                  key={item.id.toString()}
                  style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    marginVertical: 5,
                  }}
                >
                  <View style={[styles.containerUserItem, { flex: 2 }]}>
                    <View style={styles.imageUserItem}>
                      <Image
                        source={{ uri: item.owner?.avatar || DEFAULT_AVATAR }}
                        style={styles.imageItem}
                      />
                    </View>
                    <View
                      style={[
                        styles.textUserItem,
                        // widthContent && { width: widthContentUserItem },
                      ]}
                    >
                      <Text style={styles.nameUserItem}>
                        {item.owner?.fullName}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.requestBtn}>
                    <TouchableOpacity
                      onPress={() =>
                        handleResponseAddFriendRequest(
                          CONTACT_RESPONSE.DENIED,
                          item.id,
                        )
                      }
                      style={styles.buttonAdd}
                    >
                      <Icon name="xmark" size={20} color="#3498db" />
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() =>
                        handleResponseAddFriendRequest(
                          CONTACT_RESPONSE.ACCEPT,
                          item.id,
                        )
                      }
                      style={[styles.buttonAdd, styles.acceptButton]}
                    >
                      <Icon name="check" size={20} color="#3498db" />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    )
  }
  const ListContactModalContent = () => {
    return (
      <View
        style={[
          styles.contactModal,
          modalType === CONTACT_SEARCH_MODAL_TYPE.CONTACT
            ? styles.block
            : styles.hidden,
        ]}
      >
        <View style={styles.requestTitleContainer}>
          <Text style={styles.title}>Danh sách bạn bè</Text>
        </View>
        <View style={styles.requestSeparator} />
        <View style={styles.contactContent}>
          <ScrollView style={styles.contactScroll}>
            <View style={styles.contactScrollItem}>
              {allContact.map((item) => {
                const me =
                  user?.id == item?.owner.id ? item?.relate : item?.owner
                return (
                  <View
                    key={item.id.toString()}
                    style={{
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      marginVertical: 5,
                    }}
                  >
                    <View style={[styles.containerUserItem, { flex: 2 }]}>
                      <View style={styles.imageUserItem}>
                        <Image
                          source={{ uri: me?.avatar || DEFAULT_AVATAR }}
                          style={styles.imageItem}
                        />
                      </View>
                      <View
                        style={[
                          styles.textUserItem,
                          // widthContent && { width: widthContentUserItem },
                        ]}
                      >
                        <Text style={styles.nameUserItem}>{me?.fullName}</Text>
                      </View>
                    </View>

                    <View style={styles.contactBtn}>
                      <TouchableOpacity
                        style={styles.contactButton}
                      >
                        <Icon
                          name="circle-arrow-right"
                          size={25}
                          color="#3498db"
                        />
                        <Text style={styles.contactButtonText}>Nhắn tin</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )
              })}
            </View>
          </ScrollView>
        </View>
      </View>
    )
  }
  const ListSentRequest = () => {
    const handleCancelRequest = (id) => {
      dispatch(destroyContactRequest(id))
    }
    return (
      <View
        style={[
          styles.contactModal,
          modalType === CONTACT_SEARCH_MODAL_TYPE.SENT_REQUEST
            ? styles.block
            : styles.hidden,
        ]}
      >
        <View style={styles.requestTitleContainer}>
          <Text style={styles.title}>Yêu cầu đã gửi đi</Text>
        </View>
        <View style={styles.requestSeparator} />
        <View style={styles.requestContent}>
          <ScrollView style={styles.requestScroll}>
            <View style={styles.requestScrollItem}>
              {addContactRequest.map((item) => (
                <View
                  key={item.id.toString()}
                  style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    marginVertical: 5,
                  }}
                >
                  <View style={[styles.containerUserItem, { flex: 2 }]}>
                    <View style={styles.imageUserItem}>
                      <Image
                        source={{ uri: item.avatar || DEFAULT_AVATAR }}
                        style={styles.imageItem}
                      />
                    </View>
                    <View style={[styles.textUserItem]}>
                      <Text style={styles.nameUserItem}>
                        {item?.relate?.fullName}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.requestBtn}>
                    <TouchableOpacity
                      onPress={() => handleCancelRequest(item?.id)}
                      style={styles.requestButton}
                    >
                      <Icon name="xmark" size={25} color="#3498db" />
                      {/* <Text style={styles.requestButtonText}>Hủy yêu cầu</Text> */}
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    )
  }
  const ModalHeader = () => {
    return (
      <View style={styles.iconHeaderSearch}>
        <TouchableOpacity
          style={[styles.buttonHeader, { borderTopLeftRadius: 4 }]}
          onPress={() => setModalType(CONTACT_SEARCH_MODAL_TYPE.SEARCH)}
        >
          {/* <FontAwesomeIcon icon={faMagnifyingGlass} style={styles.icon} /> */}

          <Icon name="magnifying-glass" size={25} color="#3498db" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonHeader}
          onPress={() => setModalType(CONTACT_SEARCH_MODAL_TYPE.CONTACT)}
        >
          <Icon name="address-book" size={25} color="#3498db" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonHeader}
          onPress={() => setModalType(CONTACT_SEARCH_MODAL_TYPE.REQUEST)}
        >
          {contactRequest.length > 0 && (
            <View style={styles.notification}>
              <Text style={styles.notificationText}>
                {contactRequest.length}
              </Text>
            </View>
          )}
          <Icon name="user-plus" size={25} color="#3498db" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buttonHeader, { borderTopRightRadius: 4 }]}
          onPress={() => setModalType(CONTACT_SEARCH_MODAL_TYPE.SENT_REQUEST)}
        >
          {addContactRequest.length > 0 && (
            <View style={styles.notification}>
              <Text style={styles.notificationText}>
                {addContactRequest.length}
              </Text>
            </View>
          )}
          <Icon name="share-from-square" size={25} color="#3498db" />
        </TouchableOpacity>
      </View>
    )
  }
  const ModalFooter = ({ handleClose }) => {
    return (
      <>
        <View style={styles.hr} />
        <View style={styles.groupBtn}>
          <TouchableOpacity onPress={handleClose} style={styles.button}>
            <Text style={styles.buttonText}>Đóng</Text>
          </TouchableOpacity>
        </View>
      </>
    )
  }
  return (
    <View style={styles.container}>
      <View style={styles.flexContainer}>
        <View style={styles.modalContainer}>
          <ModalHeader />
          <View style={styles.modalContent}>
            <ScrollView style={{ minHeight: 500 }}>
              <View
                style={[
                  styles.contactModal,
                  modalType === CONTACT_SEARCH_MODAL_TYPE.SEARCH
                    ? styles.block
                    : styles.hidden,
                ]}
              >
                <View style={styles.titleContainer}>
                  <Text style={styles.title}>Tìm kiếm</Text>
                </View>
                <View style={styles.separator} />
                <View style={styles.searchContent}>
                  <View
                    style={{
                      marginVertical: 10,
                      width: '100%',
                      borderWidth: 1,
                      borderColor: '#ccc',
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                      borderRadius: 5,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 2,
                      }}
                    >
                      <TextInput
                        style={[styles.searchInput, { flex: 2 }]}
                        placeholder="Tìm kiếm"
                        value={searchKeyword}
                        onChangeText={(value) => {
                          setSearchKeyword(value)
                        }}
                      />
                      <TouchableOpacity onPress={handleSearchContact}>
                        <Icon
                          name="magnifying-glass"
                          size={16}
                          style={{ fontWeight: 600 }}
                          color="#ccc"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <SearchModalContent />
                </View>
              </View>
              {/* <SearchModalContent onChangeSearch={setSearchKeyword} /> */}
              <AddContactRequestModalContent />
              <ListContactModalContent />
              <ListSentRequest />
            </ScrollView>
            <ModalFooter handleClose={handleCloseModal} />
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#b5b3b354',
    margin: 'auto',
    borderRadius: 5,
  },
  flexContainer: {
    paddingTop: 50,
    flex: 1,
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    margin: 'auto',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 5,
  },

  hr: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginVertical: 8,
  },
  groupBtn: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginVertical: 16,
  },
  button: {
    backgroundColor: '#333',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 5,
  },
  buttonRequest: {},
  buttonText: {
    fontSize: 14,
    color: '#fff',
  },

  iconHeaderSearch: {
    flexDirection: 'row',
  },
  buttonHeader: {
    backgroundColor: 'white',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#b5b3b354',
  },
  icon: {
    fontSize: 20,
    color: 'gray',
  },
  notification: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationText: {
    fontSize: 10,
    color: 'white',
  },

  modal: {
    flex: 1,
    backgroundColor: '#b5b3b354',
    borderRadius: 8,
    padding: 16,
  },
  block: {
    display: 'flex',
  },
  hidden: {
    display: 'none',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  separator: {
    height: 1,
    backgroundColor: 'black',
    marginBottom: 10,
  },
  searchContent: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollItem: {
    minHeight: 300,
    maxHeight: 330,
  },
  requestBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonAdd: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginRight: 10,
  },
  acceptButton: {
    backgroundColor: 'blue',
  },
  buttonText: {
    color: 'white',
    marginLeft: 5,
  },
  icon: {
    color: 'white',
    fontSize: 16,
  },
  requestModal: {
    flex: 1,
    backgroundColor: '#b5b3b354',
    borderRadius: 8,
    padding: 16,
  },
  requestBlock: {
    display: 'flex',
  },
  requestHidden: {
    display: 'none',
  },
  requestTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  requestTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  requestSeparator: {
    height: 1,
    backgroundColor: 'black',
    marginBottom: 10,
  },
  requestContent: {
    flex: 1,
  },
  requestScroll: {
    flex: 1,
  },
  requestScrollItem: {
    minHeight: 300,
    maxHeight: 330,
  },
  requestItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  requestBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  requestButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginRight: 10,
  },
  requestButtonText: {
    color: 'white',
    marginLeft: 5,
  },
  requestIcon: {
    color: 'white',
    fontSize: 16,
  },
  contactModalContent: {
    flex: 1,
    backgroundColor: '#b5b3b354',
    borderRadius: 8,
    padding: 16,
  },
  contactBlockContent: {
    display: 'flex',
  },
  contactHiddenContent: {
    display: 'none',
  },
  contactTitleContainerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  contactTitleContent: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  contactSeparatorContent: {
    height: 1,
    backgroundColor: 'black',
    marginBottom: 10,
  },
  contactContentContent: {
    flex: 1,
  },
  contactScrollContent: {
    flex: 1,
  },
  contactScrollItemContent: {
    minHeight: 300,
    maxHeight: 330,
  },
  contactItemContainerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  contactBtnContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: '#374151', // Thay màu background phù hợp
    marginRight: 10,
  },
  contactButtonTextContent: {
    color: 'white',
    marginLeft: 5,
  },
  contactIconContent: {
    color: 'white',
    fontSize: 16,
  },
  containerUserItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageUserItem: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    marginHorizontal: 6,
  },
  imageItem: {
    width: '100%',
    height: '100%',
  },
  textUserItem: {
    flex: 1,
    overflow: 'hidden',
  },
  nameUserItem: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 2,
  },
  emailUserItem: {
    fontSize: 12,
    color: '#888',
    overflow: 'hidden',
  },
})

export default ContactModel
