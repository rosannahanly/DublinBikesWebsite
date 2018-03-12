import unittest

import dublin_bikes


class Dublin_bikesTestCase(unittest.TestCase):

    def setUp(self):
        self.app = dublin_bikes.app.test_client()

    def test_index(self):
        rv = self.app.get('/')
        self.assertIn('Welcome to Dublin Bikes', rv.data.decode())


if __name__ == '__main__':
    unittest.main()
