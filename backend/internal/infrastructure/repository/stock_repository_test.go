package repository_test

import (
	"errors"
	"regexp"
	"testing"
	"time"

	"github.com/DATA-DOG/go-sqlmock"
	"github.com/riii111/go-rust-comparison/internal/domain/models"
	"github.com/riii111/go-rust-comparison/internal/infrastructure/repository"
	"github.com/shopspring/decimal"
	"github.com/stretchr/testify/suite"
	"gorm.io/gorm"
)

type StockRepositorySuite struct {
	suite.Suite
	repository repository.StockRepository
}

func TestStockRepositorySuite(t *testing.T) {
	suite.Run(t, new(StockRepositorySuite))
}

func (suite *StockRepositorySuite) MockDB() sqlmock.Sqlmock {
	mock, mockGormDB := repository.MockDB()
	suite.repository = repository.NewStockRepository(mockGormDB)
	return mock
}

const (
	GETSTOCK = `SELECT * FROM "stocks" WHERE id = $1 ORDER BY "stocks"."id" LIMIT $2`

	ID        = "00000000-0000-0000-0000-000000000000"
	ProductID = "00000000-0000-0000-0000-000000000001"
	StoreID   = "00000000-0000-0000-0000-000000000002"
	CreatedBy = "00000000-0000-0000-0000-000000000003"
	UpdatedBy = "00000000-0000-0000-0000-000000000004"
)

var testStock = models.Stock{
	ID:          ID,
	ProductID:   ProductID,
	StoreID:     StoreID,
	Size:        "Large",
	Color:       "RED",
	Quantity:    100,
	Price:       decimal.New(1000, 0),
	IsAvailable: false,
	CreatedBy:   CreatedBy,
	UpdatedBy:   UpdatedBy,
	CreatedAt:   time.Now(),
	UpdatedAt:   time.Now(),
}

func (suite *StockRepositorySuite) TestStockGet() {
	mockDB := suite.MockDB()

	stockColumn := []string{
		"id",
		"product_id",
		"store_id",
		"size",
		"color",
		"quantity",
		"price",
		"is_available",
		"created_by",
		"updated_by",
		"created_at",
		"updated_at",
	}

	rows := sqlmock.NewRows(stockColumn).AddRow(
		testStock.ID,
		testStock.ProductID,
		testStock.StoreID,
		testStock.Size,
		testStock.Color,
		testStock.Quantity,
		testStock.Price,
		testStock.IsAvailable,
		testStock.CreatedBy,
		testStock.UpdatedBy,
		testStock.CreatedAt,
		testStock.UpdatedAt,
	)

	// regexp.QuoteMeta関数を使うことでsqlmockの正規表現マッチを楽に記述できます。
	mockDB.ExpectQuery(regexp.QuoteMeta(GETSTOCK)).WithArgs(ID, 1).WillReturnRows(rows)

	stock, err := suite.repository.Get(ID)
	suite.Assert().NotNil(stock)
	suite.Assert().Equal(*stock, testStock)
	suite.Assert().Nil(err)
}

func (suite *StockRepositorySuite) TestStockGetNotFound() {
	mockDB := suite.MockDB()
	mockDB.ExpectQuery(regexp.QuoteMeta(GETSTOCK)).
		WithArgs(ID, 1).
		WillReturnError(gorm.ErrRecordNotFound)

	stock, err := suite.repository.Get(ID)

	suite.Assert().Nil(stock)
	suite.Assert().NotNil(err)
	suite.Assert().Equal("レコードが見つかりません", err.Error())
}

func (suite *StockRepositorySuite) TestStockGetFailure() {
	mockDB := suite.MockDB()
	mockDB.ExpectQuery(regexp.QuoteMeta(GETSTOCK)).
		WithArgs(ID, 1).
		WillReturnError(errors.New("エラー"))

	stock, err := suite.repository.Get(ID)

	suite.Assert().Nil(stock)
	suite.Assert().NotNil(err)
	suite.Assert().Equal("エラー", err.Error())
}
