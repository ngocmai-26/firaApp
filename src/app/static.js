import { AdminSideNavItem } from "../interfaces/AdminSideNavItem";

export const CONTACT_SEARCH_MODAL_TYPE = {
    SEARCH: 1,
    CONTACT: 2,
    REQUEST: 3,
    SENT_REQUEST: 4,
  };

  
export const CONTACT_RESPONSE = {
  ACCEPT: 1,
  DENIED: 0,
};

export const CONTACT_NOTI_EVENT_TYPE = {
  NEW_REQUEST: 2,
  RESPONSE_REQUEST: 1,
};
const ADMIN_NAVBAR_ITEMS = [
  new AdminSideNavItem(1, 'dashboard', "chart-pie", 'Dashboards'),
  new AdminSideNavItem(2, 'quan-ly-tai-khoan', "users-gear", 'Quản lý tài khoản'),
  new AdminSideNavItem(
    3,
    'quan-ly-cong-viec',
    "clipboard-list",
    ' Quản lý công việc',
  ),
  new AdminSideNavItem(
    4,
    'notesApp',
    "calendar",
    'Quản lý lịch làm việc',
  ),
  new AdminSideNavItem(
    5,
    'quan-ly-chuc-vu',
    "user-pen",
    ' Quản lý lịch chức vụ',
  ),
  new AdminSideNavItem(
    6,
    'quan-ly-chuc-nang',
    "users-gear",
    'Quản lý lịch chức năng',
  ),
  // new AdminSideNavItem(7, 'quan-ly-danh-muc-kpi', "square-pen", ' Quản lý danh mục kpi'),
  new AdminSideNavItem(8, 'quan-ly-kpi', "square-pen", ' Quản lý kpi'),
  new AdminSideNavItem(9, 'checkin', "right-to-bracket", ' Checkin'),

]

const ANONYMOUS = [
  new AdminSideNavItem(1, 'dashboard', "chart-pie", 'Dashboards'),
  new AdminSideNavItem(
    3,
    'quan-ly-cong-viec',
    "clipboard-list",
    ' Quản lý công việc',
  ),
  new AdminSideNavItem(
    4,
    'notesApp',
    "calendar",
    'Quản lý lịch làm việc',
  ),
  // new AdminSideNavItem(7, 'quan-ly-danh-muc-kpi', "square-pen", ' Quản lý danh mục kpi'),
  new AdminSideNavItem(8, 'quan-ly-kpi', "square-pen", ' Quản lý kpi'),
  new AdminSideNavItem(9, 'checkin', "right-to-bracket", ' Checkin'),
]
const MANAGER_NAVBAR_ITEMS = [
  new AdminSideNavItem(1, 'dashboard', "chart-pie", 'Dashboards'),
  new AdminSideNavItem(
    3,
    'quan-ly-cong-viec',
    "clipboard-list",
    ' Quản lý công việc',
  ),
  new AdminSideNavItem(
    4,
    'notesApp',
    "calendar",
    'Quản lý lịch làm việc',
  ),
  new AdminSideNavItem(8, 'quan-ly-kpi', "square-pen", ' Quản lý kpi'),
  new AdminSideNavItem(9, 'checkin', "right-to-bracket", ' Checkin'),
]
const STAFF_NAVBAR_ITEMS = [
  new AdminSideNavItem(1, 'dashboard', "chart-pie", 'Dashboards'),
  new AdminSideNavItem(
    3,
    'quan-ly-cong-viec',
    "clipboard-list",
    ' Quản lý công việc',
  ),
  new AdminSideNavItem(
    4,
    'notesApp',
    "calendar",
    'Quản lý lịch làm việc',
  ),
  // new AdminSideNavItem(7, 'quan-ly-danh-muc-kpi', "square-pen", ' Quản lý danh mục kpi'),
  new AdminSideNavItem(8, 'quan-ly-kpi', "square-pen", ' Quản lý kpi'),
  new AdminSideNavItem(9, 'checkin', "right-to-bracket", ' Checkin'),
]

export { ADMIN_NAVBAR_ITEMS, ANONYMOUS, MANAGER_NAVBAR_ITEMS, STAFF_NAVBAR_ITEMS }
export const DEFAULT_AVATAR =
  "https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg";
