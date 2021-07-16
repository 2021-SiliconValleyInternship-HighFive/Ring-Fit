import Home from './pages/Home';
import Guide from './pages/Guide';
import Upload from './pages/Upload';
import Measure from './pages/Measure';
import Result from './pages/Result';
import User from './pages/User';

export default [
    {
        page : '/',
        component : Home
    },
    {
        page : '/guide',
        component : Guide
    },
    {
        page : '/upload',
        component : Upload
    },
    {
        page : '/measure',
        component : Measure
    },
    {
        page : '/result',
        component : Result
    },
    {
        page : '/user',
        component : User
    },
]